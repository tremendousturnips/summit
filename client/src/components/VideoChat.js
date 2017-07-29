import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import VideoBox from './VideoBox';
import ICE_SERVERS from '../../../config/ice_servers';

class VideoChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localMediaStream: null,
      peerConnections: {},
      peerMediaStreams: {},
      room: 'default' // CHANGE THIS TO USER'S ROOM
    };
  }

  componentDidMount() {
    const { socket } = this.props;
    console.log('SOCKET ID', socket.id);

    const mediaOptions = {
      audio: true,
      video: {
        width: { exact: 352 },
        height: { exact: 240 }
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
          () => this.props.socket.emit('joinVideo', this.state.room)
        );
      },
      () => {
        console.log('Access denied for audio/video');
      }
    );

    socket.on('addPeer', req => {
      const { peer_id, should_create_offer } = req;

      if (this.state.peerConnections[peer_id]) {
        console.log('Already connected to peer ', peer_id);
        return;
      }

      const peer_connection = new RTCPeerConnection(
        { iceServers: ICE_SERVERS },
        { optional: [{ DtlsSrtpKeyAgreement: true }] }
      );

      this.setState({
        peerConnections: { ...this.state.peerConnections, [peer_id]: peer_connection }
      });

      peer_connection.onicecandidate = e => {
        console.log('ONICECANDIDATE FIRED');
        if (e.candidate) {
          socket.emit('relayICECandidate', {
            room: this.state.room,
            peer_id,
            ice_candidate: {
              sdpMLineIndex: e.candidate.sdpMLineIndex,
              candidate: e.candidate.candidate
            }
          });
        }
      };

      peer_connection.onaddstream = e => {
        this.setState({
          peerMediaStreams: {
            ...this.state.peerMediaStreams,
            [peer_id]: {
              id: peer_id,
              stream: e.stream
            }
          }
        });
      };

      if (this.state.localMediaStream) {
        peer_connection.addStream(this.state.localMediaStream);
      }

      if (should_create_offer) {
        peer_connection
          .createOffer()
          .then(offer => peer_connection.setLocalDescription(offer))
          .then(() =>
            socket.emit('relaySessionDescription', {
              room: this.state.room,
              peer_id,
              session_description: peer_connection.localDescription
            })
          )
          .catch(err => console.log('Offer setLocalDescription failed! ERROR:', err));
      }
    });

    socket.on('removePeer', peer_id => {
      console.log('Removing peer', peer_id);
      if (this.state.peerConnections[peer_id]) {
        this.state.peerConnections[peer_id].close(); // HERE'S SOMETHING
        this.setState({
          peerConnections: { ...this.state.peerConnections, [peer_id]: null },
          peerMediaStreams: { ...this.state.peerMediaStreams, [peer_id]: null }
        });
      }
    });

    socket.on('sessionDescription', req => {
      const { peer_id, session_description } = req;
      const peerConnection = this.state.peerConnections[peer_id];

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
      console.log('ICECANDIDATE');
      const { peer_id, ice_candidate } = req;
      const peerConnection = this.state.peerConnections[peer_id];
      peerConnection.addIceCandidate(new RTCIceCandidate(ice_candidate));
    });
  }

  componentWillUnmount() {
    if (this.state.localMediaStream) {
      this.props.socket.emit('leaveVideo', this.state.room);
      this.state.localMediaStream.getTracks().forEach(track => track.stop());
    }
  }

  render() {
    const peerStreams = Object.values(this.state.peerMediaStreams).filter(stream => !!stream);
    return (
      <Container>
        {this.state.localMediaStream
          ? <VideoBox id="localMediaStream" stream={this.state.localMediaStream} />
          : ''}
        {peerStreams.map(stream =>
          <VideoBox key={stream.id} id={stream.id} stream={stream.stream} />
        )}
      </Container>
    );
  }
}

export default VideoChat;
