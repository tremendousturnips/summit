import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import VideoBox from './VideoBox';

class VideoChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localMediaStream: null,
      peerConnections: {},
      peerMediaStreams: {},
      mute: true, // CHECK NECESSITY
      room: 'default' // CHANGE THIS TO USER'S ROOM
    };
    const bind = fn => fn.bind(this);
    this.startVideo = bind(this.startVideo);
    this.endVideo = bind(this.endVideo);
    // this.setupLocalMedia = bind(this.setupLocalMedia);
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
    const { socket } = this.props;
    const { peerConnections, peerMediaStreams, localMediaStream, room } = this.state;

    socket.on('addPeer', req => {
      console.log('ADDING PEER :D');
      const { peer_id, should_create_offer } = req;

      if (peerConnections[peer_id]) {
        console.log('Already connected to peer ', peer_id);
        return;
      }

      const peer_connection = new RTCPeerConnection(
        { iceServers: ICE_SERVERS },
        { optional: [{ DtlsSrtpKeyAgreement: true }] }
      );

      this.setState({
        peerConnections: { ...peerConnections, [peer_id]: peer_connection }
      });

      peer_connection.onicecandidate = e => {
        console.log('E.CANDIDATE:', e.candidate);
        if (e.candidate) {
          socket.emit('relayICECandidate', {
            room,
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
        peer_connection.createOffer(
          session_description => {
            peer_connection.setLocalDescription(
              session_description,
              () => {
                socket.emit('relaySessionDescription', {
                  room,
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

    socket.on('removePeer', peer_id => {
      if (peerConnections[peer_id]) {
        peerConnections[peer_id].close(); // HERE'S SOMETHING
        this.setState({
          peerConnections: { ...peerConnections, [peer_id]: null }, // HERE'S SOMETHING
          peerMediaStreams: { ...peerMediaStreams, [peer_id]: null }
        });
      }
    });

    socket.on('sessionDescription', req => {
      const { peer_id, session_description } = req;
      const peerConnection = peerConnections[peer_id];
      const description = new RTCSessionDescription(session_description);

      peerConnection.setRemoteDescription(
        description,
        () => {
          if (session_description.type === 'offer') {
            peerConnection.createAnswer(
              session_description => {
                peerConnection.setLocalDescription(
                  session_description,
                  () => {
                    socket.emit('relaySessionDescription', {
                      room,
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
                console.log(peerConnection);
              }
            );
          }
        },
        error => {
          console.log('setRemoteDescription error:', error);
        }
      );
    });

    socket.on('iceCandidate', req => {
      const { peer_id, ice_candidate } = req;
      const peerConnection = peerConnections[peer_id];
      peerConnection.addIceCandidate(new RTCIceCandidate(ice_candidate));
    });
  }

  componentWillUnmount() {
    this.endVideo();
  }

  // setupLocalMedia(cb, errorback) {
  //   navigator.getUserMedia =
  //     navigator.getUserMedia ||
  //     navigator.webkitGetUserMedia ||
  //     navigator.mozGetUserMedia ||
  //     navigator.msGetUserMedia;

  //   navigator.getUserMedia(
  //     { audio: true, video: true },
  //     localMediaStream => {
  //       this.setState(
  //         {
  //           localMediaStream
  //         },
  //         () => cb()
  //       );
  //     },
  //     () => {
  //       console.log('Access denied for audio/video');
  //       if (errorback) {
  //         errorback();
  //       }
  //     }
  //   );
  // }

  startVideo() {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(localMediaStream => {
        this.setState(
          {
            localMediaStream
          },
          () => localMediaStream
        );
      })
      .then(localMediaStream => this.props.socket.emit('joinVideo', this.state.room))
      .catch(err => {
        err.name === 'PermissionDeniedError'
          ? alert('Access denied for audio/video')
          : console.log('ERROR getting localMediaStream:', err);
      });
    // this.setupLocalMedia(() => {
    //   this.props.socket.emit('joinVideo', this.state.room);
    // });
  }

  endVideo() {
    if (this.state.localMediaStream) {
      this.props.socket.emit('part', this.state.room);
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
