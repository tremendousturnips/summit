import React from 'react';
import { connect } from 'react-redux';
import VideoBox from './VideoBox';
import ICE_SERVERS from '../../../config/ice_servers';

class VideoChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localMediaStream: null,
      peerMediaStreams: {},
      room: this.props.currentRoom.id // CHANGE THIS TO USER'S ROOM
    };
    this.toggleAudioStream = this.toggleAudioStream.bind(this);
  }

  componentDidMount() {
    const { socket } = this.props;
    const peerConnections = {};

    console.log('Socket ID:', socket.id);

    const mediaOptions = {
      audio: true,
      video: {
        width: { exact: 200 },
        height: { exact: 150 }
      }
    };

    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    navigator.getUserMedia(
      mediaOptions,
      localMediaStream => {
        this.setState(
          {
            localMediaStream
          },
          () => {
            this.props.socket.emit('joinVideo', this.state.room);
          }
        );
      },
      () => {
        console.log('Access denied for audio/video');
      }
    );

    socket.on('addPeer', req => {
      const { peer_id, should_create_offer } = req;
      const { room, peerMediaStreams, localMediaStream } = this.state;
      console.log('Adding peer', peer_id);

      if (peerConnections[peer_id]) {
        console.log('Already connected to peer ', peer_id);
        return;
      }

      const peer_connection = new RTCPeerConnection(
        { iceServers: ICE_SERVERS },
        { optional: [{ DtlsSrtpKeyAgreement: true }] }
      );

      peerConnections[peer_id] = peer_connection;

      peer_connection.onicecandidate = e => {
        if (e.candidate) {
          console.log('onicecandidate fired for', e.candidate);
          const { candidate, sdpMLineIndex } = e.candidate;
          socket.emit('relayICECandidate', {
            room,
            peer_id,
            ice_candidate: {
              candidate,
              sdpMLineIndex
            }
          });
        }
      };

      peer_connection.onaddstream = e => {
        this.setState({
          peerMediaStreams: {
            ...peerMediaStreams,
            [peer_id]: {
              id: peer_id,
              stream: e.stream
            }
          }
        });
      };

      if (localMediaStream) {
        peer_connection.addStream(localMediaStream);
      }

      if (should_create_offer) {
        peer_connection
          .createOffer() // { iceRestart: true } option probably unnecessary
          .then(offer => peer_connection.setLocalDescription(offer))
          .then(() =>
            socket.emit('relaySessionDescription', {
              room,
              peer_id,
              session_description: peer_connection.localDescription
            })
          )
          .catch(err => console.log('Offer setLocalDescription failed! ERROR:', err));
      }
    });

    socket.on('removePeer', peer_id => {
      console.log('Removing peer', peer_id);
      if (peerConnections[peer_id]) {
        peerConnections[peer_id].close(); // HERE'S SOMETHING
        // this.state.peerMediaStreams[peer_id].getTracks().forEach(track => track.stop());
        delete peerConnections[peer_id];
        this.setState({
          peerMediaStreams: { ...this.state.peerMediaStreams, [peer_id]: null }
        });
      }
    });

    socket.on('sessionDescription', req => {
      const { peer_id, session_description } = req;
      const peerConnection = peerConnections[peer_id];

      console.log('sessionsdescription received from', peer_id);

      peerConnection
        .setRemoteDescription(session_description)
        .then(() => {
          if (session_description.type === 'offer') return peerConnection.createAnswer();
          else throw 'noOffer';
        })
        .then(answer => peerConnection.setLocalDescription(answer))
        .then(() =>
          socket.emit('relaySessionDescription', {
            room: this.state.room,
            peer_id,
            session_description: peerConnection.localDescription
          })
        )
        .catch(err => {
          if (err !== 'noOffer') console.log('Answer setLocalDescription failed!');
        });
    });

    socket.on('iceCandidate', req => {
      const { peer_id, ice_candidate } = req;
      console.log('icecandidate', peer_id);
      const peerConnection = peerConnections[peer_id];
      peerConnection.addIceCandidate(new RTCIceCandidate(ice_candidate));
    });
  }

  toggleAudioStream(streamId) {
    const { localMediaStream, peerMediaStreams } = this.state;
    if (streamId === 'localMediaStream' && localMediaStream) {
      const audioEnabled = localMediaStream.getAudioTracks()[0].enabled;
      localMediaStream.getAudioTracks()[0].enabled = !audioEnabled;
    } else if (peerMediaStreams[streamId]) {
      const audioEnabled = peerMediaStreams[streamId].stream.getAudioTracks()[0].enabled;
      peerMediaStreams[streamId].stream.getAudioTracks()[0].enabled = !audioEnabled;
    }
  }

  componentWillUnmount() {
    const { localMediaStream, room } = this.state;
    if (localMediaStream) {
      this.props.socket.emit('leaveVideo', room);
      localMediaStream.getTracks().forEach(track => track.stop());
    }
  }

  render() {
    const { localMediaStream, peerMediaStreams } = this.state;
    const peerStreams = Object.values(peerMediaStreams).filter(stream => !!stream);
    return (
      <div>
        {localMediaStream
          ? <VideoBox
              id="localMediaStream"
              stream={localMediaStream}
              toggleAudio={this.toggleAudioStream}
            />
          : ''}
        {peerStreams.map(stream =>
          <VideoBox
            key={stream.id}
            id={stream.id}
            stream={stream.stream}
            toggleAudio={this.toggleAudioStream}
          />
        )}
      </div>
    );
  }
}

export default VideoChat;
