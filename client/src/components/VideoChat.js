import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import VideoBox from './VideoBox';

class VideoChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localMediaStream: null,
      peers: {},
      peerMediaStreams: {},
      mute: true
    };
    const bind = fn => fn.bind(this);
    this.startVideo = bind(this.startVideo);
    this.endVideo = bind(this.endVideo);
    this.setupLocalMedia = bind(this.setupLocalMedia);
  }

  componentDidMount() {
    this.startVideo();

    const ICE_SERVERS = [
      { url: 'stun:global.stun.twilio.com:3478?transport=udp' },
      {
        url: 'turn:global.turn.twilio.com:3478?transport=udp',
        username: '7823fd6b34baece7e291276e43969bc5d8a7ce41ad78ba86b9ca8b7f9a7b2e13',
        credential: 'Yc5kCs9eC5JOeps4mbmURNmUVjWdJof9N3MItd51zx8='
      },
      {
        url: 'turn:global.turn.twilio.com:3478?transport=tcp',
        username: '7823fd6b34baece7e291276e43969bc5d8a7ce41ad78ba86b9ca8b7f9a7b2e13',
        credential: 'Yc5kCs9eC5JOeps4mbmURNmUVjWdJof9N3MItd51zx8='
      },
      {
        url: 'turn:global.turn.twilio.com:443?transport=tcp',
        username: '7823fd6b34baece7e291276e43969bc5d8a7ce41ad78ba86b9ca8b7f9a7b2e13',
        credential: 'Yc5kCs9eC5JOeps4mbmURNmUVjWdJof9N3MItd51zx8='
      }
    ];

    const signalingSocket = this.props.socket;

    console.log('SOCKET:', signalingSocket);

    signalingSocket.on('connect', () => {
      console.log('Connected to signaling server');
    });

    signalingSocket.on('disconnect', () => {
      console.log('Disconnected from signaling server');
    });

    signalingSocket.on('addPeer', config => {
      const peer_id = config.peer_id;
      if (this.state.peers[peer_id]) {
        console.log('Already connected to peer ', peer_id);
        return;
      }

      const peer_connection = new RTCPeerConnection(
        { iceServers: ICE_SERVERS },
        { optional: [{ DtlsSrtpKeyAgreement: true }] }
      );

      this.setState({
        peers: { ...this.state.peers, [peer_id]: peer_connection }
      });

      peer_connection.onicecandidate = e => {
        if (e.candidate) {
          signalingSocket.emit('relayICECandidate', {
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

      if (config.should_create_offer) {
        peer_connection.createOffer(
          session_description => {
            peer_connection.setLocalDescription(
              session_description,
              () => {
                signalingSocket.emit('relaySessionDescription', {
                  peer_id,
                  session_description
                });
              },
              () => {
                console.log('Offer setLocalDescription failed!');
              }
            );
          },
          error => {
            console.log('Error sending offer: ', error);
          }
        );
      }
    });

    signalingSocket.on('sessionDescription', config => {
      console.log('Remote description received: ', config);
      const peer_id = config.peer_id;
      const peer = this.state.peers[peer_id];
      const remote_description = config.session_description;

      const desc = new RTCSessionDescription(remote_description);
      peer.setRemoteDescription(
        desc,
        () => {
          if (remote_description.type === 'offer') {
            peer.createAnswer(
              session_description => {
                peer.setLocalDescription(
                  session_description,
                  () => {
                    signalingSocket.emit('relaySessionDescription', {
                      peer_id,
                      session_description
                    });
                  },
                  () => {
                    alert('Answer setLocalDescription failed!');
                  }
                );
              },
              error => {
                console.log('Error creating answer: ', error);
                console.log(peer);
              }
            );
          }
        },
        error => {
          console.log('setRemoteDescription error:', error);
        }
      );
    });

    signalingSocket.on('iceCandidate', config => {
      const peer = this.state.peers[config.peer_id];
      const ice_candidate = config.ice_candidate;
      peer.addIceCandidate(new RTCIceCandidate(ice_candidate));
    });

    signalingSocket.on('removePeer', config => {
      console.log('Signaling server said to remove peer:', config);
      const peer_id = config.peer_id;
      if (peer_id in this.state.peers) { // HERE'S SOMETHING
        this.state.peers[peer_id].close();
      }
      this.setState({
        peers: { ...this.state.peers, [peer_id]: null }, // HERE'S SOMETHING
        peerMediaStreams: { ...this.state.peerMediaStreams, [peer_id]: null }
      });
    });
  }

  componentWillUnmount() {
    this.endVideo();
  }

  setupLocalMedia(cb, errorback) {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    navigator.getUserMedia(
      { audio: 'true', video: 'true' },
      localMediaStream => {
        this.setState(
          {
            localMediaStream
          },
          () => cb()
        );
      },
      () => {
        console.log('Access denied for audio/video');
        if (errorback) {
          errorback();
        }
      }
    );
  }

  startVideo() {
    if (!this.state.localMediaStream) {
      const channel = 'videochat';
      this.setupLocalMedia(() => {
        this.props.socket.emit('join', { channel, userdata: this.props.user });
      });
    }
  }

  endVideo() {
    if (this.state.localMediaStream) {
      this.props.socket.emit('part', 'videochat');
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
        {peerStreams.map(stream => <VideoBox key={stream.id} id={stream.id} stream={stream.stream} />)}
      </Container>
    );
  }
}

export default VideoChat;
