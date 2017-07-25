import React from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Label, Sidebar, Menu, Container } from 'semantic-ui-react';
import $ from 'jquery';
import LocalVideo from './LocalVideo';

class VideoChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      something: true,
      localMediaStream: null,
      localVideo: null
    };

    this.signalingSocket = this.props.socket;
    this.peers = {};
    this.peerMediaElements = {};
    this.mute = true;

    const bind = fn => fn.bind(this);

    this.startVideo = bind(this.startVideo);
    this.endVideo = bind(this.endVideo);
    this.attachMediaStream = bind(this.attachMediaStream);
    this.setLocalMediaStream = bind(this.setLocalMediaStream);
    this.setupLocalMedia = bind(this.setupLocalMedia);
    this.joinChatChannel = bind(this.joinChatChannel);
    this.partChatChannel = bind(this.partChatChannel);
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

    const state = this.state;
    // let USE_AUDIO = true;
    // let USE_VIDEO = true;
    const localMediaStream = this.state.localMediaStream;
    let peers = this.peers;
    let peerMediaElements = this.peerMediaElements;
    let signalingSocket = this.signalingSocket;
    let attachMediaStream = this.attachMediaStream.bind(this);

    this.signalingSocket.on('connect', () => {
      console.log('Connected to signaling server');
    });

    this.signalingSocket.on('disconnect', () => {
      console.log('Disconnected from signaling server');

      for (const peer_id in peerMediaElements) {
        peerMediaElements[peer_id].remove();
      }
      for (const peer_id in peers) {
        peers[peer_id].close();
      }
      peers = {};
      peerMediaElements = {};
    });

    this.signalingSocket.on('addPeer', config => {
      let peer_id = config.peer_id;
      if (peers[peer_id]) {
        console.log('Already connected to peer ', peer_id);
        return;
      }

      const peer_connection = new RTCPeerConnection(
        { iceServers: ICE_SERVERS },
        { optional: [{ DtlsSrtpKeyAgreement: true }] }
      );

      peers[peer_id] = peer_connection;

      peer_connection.onicecandidate = e => {
        console.log('In onicecandicate');
        if (e.candidate) {
          signalingSocket.emit('relayICECandidate', {
            peer_id: peer_id,
            ice_candidate: {
              sdpMLineIndex: e.candidate.sdpMLineIndex,
              candidate: e.candidate.candidate
            }
          });
        }
      };
      peer_connection.onaddstream = e => {
        console.log('onAddStream', e);
        let remote_media = document.createElement('video');
        remote_media.setAttribute('autoPlay', '');
        remote_media.setAttribute('height', '100');
        remote_media.setAttribute('width', '100');
        remote_media.setAttribute('id', peer_id);
        remote_media.setAttribute('muted', 'false');
        peerMediaElements[peer_id] = remote_media;
        document.getElementById('peers').append(remote_media);
        attachMediaStream(remote_media, e.stream);
      };

      if (localMediaStream) {
        peer_connection.addStream(localMediaStream);
      }
      // peer_connection.addStream(localMediaStream);

      if (config.should_create_offer) {
        console.log('Creating RTC offer to ', peer_id);
        peer_connection.createOffer(
          local_description => {
            console.log('Local offer description is: ', local_description);
            peer_connection.setLocalDescription(
              local_description,
              () => {
                signalingSocket.emit('relaySessionDescription', {
                  peer_id: peer_id,
                  session_description: local_description
                });
                console.log('Offer setLocalDescription succeeded');
              },
              () => {
                Alert('Offer setLocalDescription failed!');
              }
            );
          },
          error => {
            console.log('Error sending offer: ', error);
          }
        );
      }
    });

    this.signalingSocket.on('sessionDescription', config => {
      console.log('Remote description received: ', config);
      let peer_id = config.peer_id;
      let peer = peers[peer_id];
      let remote_description = config.session_description;
      console.log(config.session_description);

      let desc = new RTCSessionDescription(remote_description);
      let stuff = peer.setRemoteDescription(
        desc,
        () => {
          console.log('setRemoteDescription succeeded');
          if (remote_description.type === 'offer') {
            console.log('Creating answer');
            peer.createAnswer(
              local_description => {
                console.log('Answer description is: ', local_description);
                peer.setLocalDescription(
                  local_description,
                  () => {
                    signalingSocket.emit('relaySessionDescription', {
                      peer_id: peer_id,
                      session_description: local_description
                    });
                    console.log('Answer setLocalDescription succeeded');
                  },
                  () => {
                    Alert('Answer setLocalDescription failed!');
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
          console.log('setRemoteDescription error: ', error);
        }
      );
      console.log('Description Object: ', desc);
    });

    this.signalingSocket.on('iceCandidate', config => {
      let peer = peers[config.peer_id];
      let ice_candidate = config.ice_candidate;
      peer.addIceCandidate(new RTCIceCandidate(ice_candidate));
    });

    this.signalingSocket.on('removePeer', config => {
      console.log('Signaling server said to remove peer:', config);
      let peer_id = config.peer_id;
      if (peer_id in peerMediaElements) {
        peerMediaElements[peer_id].remove();
      }
      if (peer_id in peers) {
        peers[peer_id].close();
      }
      delete peers[peer_id];
      delete peerMediaElements[config.peer_id];
    });
  }

  componentWillUnmount() {
    this.endVideo();
  }

  attachMediaStream(element, stream) {
    console.log('In attachMediaStream', stream);
    element.srcObject = stream;
  }

  setLocalMediaStream(stream) {
    this.setState({
      localMediaStream: stream,
      localVideo: <LocalVideo key="test1" stream={stream} />
    });
  }

  setupLocalMedia(callback, errorback) {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    let setLocalMediaStream = this.setLocalMediaStream.bind(this);
    navigator.getUserMedia(
      { audio: 'true', video: 'true' },
      stream => {
        setLocalMediaStream(stream);
        if (callback) {
          callback();
        }
      },
      () => {
        console.log('Access denied for audio/video');
        if (errorback) {
          errorback();
        }
      }
    );
  }

  joinChatChannel(channel, userdata) {
    this.signalingSocket.emit('join', { channel: channel, userdata: userdata });
  }

  partChatChannel(channel) {
    this.signalingSocket.emit('part', channel);
    for (let track of this.state.localMediaStream.getTracks()) {
      track.stop();
    }
    this.state.localMediaStream = null;
  }

  startVideo() {
    if (!this.state.localMediaStream) {
      const DEFAULT_CHANNEL = 'videochat';
      this.setupLocalMedia(() => {
        this.joinChatChannel(DEFAULT_CHANNEL, this.props.user);
      });
    }
  }

  endVideo() {
    if (this.state.localMediaStream) {
      this.partChatChannel('videochat');
    }
  }

  render() {
    return (
      <Container>
        {this.state.localVideo}
        {/*<LocalVideo key="test1" stream={this.state.localMediaStream} />*/}
        <div id="peers" />
      </Container>
    );
  }
}

export default VideoChat;
