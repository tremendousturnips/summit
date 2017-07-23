import React from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Label } from 'semantic-ui-react'; 
import $ from 'jquery';
import LocalVideo from './LocalVideo';

class GroupChat extends React.Component {

    constructor(props) {
        super (props)
        this.state = {
            localVideo: []
        }
        this.signalingSocket = this.props.socket;  
        this.localMediaStream = null; 
        this.peers = {};               
        this.peerMediaElements = {};
        this.mute = true; 

        this.startVideo = this.startVideo.bind(this)
        this.endVideo = this.endVideo.bind(this)
        this.attachMediaStream = this.attachMediaStream.bind(this)
        this.setLocalMediaStream = this.setLocalMediaStream.bind(this)
        this.setupLocalMedia = this.setupLocalMedia.bind(this)
        this.joinChatChannel = this.joinChatChannel.bind(this)
        this.partChatChannel = this.partChatChannel.bind(this)
        this.getLocalMediaStream = this.getLocalMediaStream.bind(this);
    }

    componentDidMount() {

        var ICE_SERVERS = [{"url":"stun:global.stun.twilio.com:3478?transport=udp"},
        {"url":"turn:global.turn.twilio.com:3478?transport=udp",
        "username":"995e1483c0da224d8cf4af9c009f8031e06ce791d7ee4021ccb0076ba9fca01c",
        "credential":"I1gYpgJj33o34oXqPTTvS7XdkG2JL5sYHDN8mcyL++Q="},
        {"url":"turn:global.turn.twilio.com:3478?transport=tcp",
        "username":"995e1483c0da224d8cf4af9c009f8031e06ce791d7ee4021ccb0076ba9fca01c",
        "credential":"I1gYpgJj33o34oXqPTTvS7XdkG2JL5sYHDN8mcyL++Q="},
        {"url":"turn:global.turn.twilio.com:443?transport=tcp",
        "username":"995e1483c0da224d8cf4af9c009f8031e06ce791d7ee4021ccb0076ba9fca01c",
        "credential":"I1gYpgJj33o34oXqPTTvS7XdkG2JL5sYHDN8mcyL++Q="}];

        let USE_AUDIO = true;
        let USE_VIDEO = true;
        let localMediaStream = this.localMediaStream; 
        let peers = this.peers;               
        let peerMediaElements = this.peerMediaElements;
        let signalingSocket = this.signalingSocket;
        let attachMediaStream = this.attachMediaStream;
        let getLocalMediaStream = this.getLocalMediaStream;

        this.signalingSocket.on('connect', function() {
            console.log("Connected to signaling server");
        });

        this.signalingSocket.on('disconnect', function() {
            console.log("Disconnected from signaling server");
 
            for (var peer_id in peerMediaElements) {
                peerMediaElements[peer_id].remove();
            }
            for (var peer_id in peers) {
                peers[peer_id].close();
            }
            peers = {};
            peerMediaElements = {};
        });

        this.signalingSocket.on('addPeer', function(config) {

            let peer_id = config.peer_id;
            if (peers[peer_id] !== undefined) {
                console.log("Already connected to peer ", peer_id);
                return;
            }

            var peer_connection = new RTCPeerConnection(
                {"iceServers": ICE_SERVERS},
                {"optional": [{"DtlsSrtpKeyAgreement": true}]} 
            );

            peers[peer_id] = peer_connection;

            peer_connection.onicecandidate = function(event) {
                console.log('In onicecandicate')
                if (event.candidate) {
                    signalingSocket.emit('relayICECandidate', {
                        'peer_id': peer_id, 
                        'ice_candidate': {
                            'sdpMLineIndex': event.candidate.sdpMLineIndex,
                            'candidate': event.candidate.candidate
                        }
                    });
                }
            }
            peer_connection.onaddstream = function(event) {
                console.log("onAddStream", event);
                let remote_media = document.createElement('video');
                remote_media.setAttribute("autoPlay", "");
                remote_media.setAttribute("height", "100");
                remote_media.setAttribute("width", "100");
                remote_media.setAttribute("id", peer_id);
                remote_media.setAttribute("muted", "false");
                peerMediaElements[peer_id] = remote_media;
                document.getElementById('peers').append(remote_media);
                attachMediaStream(remote_media, event.stream);
            };

            if (localMediaStream === undefined || localMediaStream === null) {
                localMediaStream = getLocalMediaStream()
            };

            peer_connection.addStream(localMediaStream);

            if (config.should_create_offer) {
                console.log("Creating RTC offer to ", peer_id);
                peer_connection.createOffer(
                    function (local_description) { 
                        console.log("Local offer description is: ", local_description);
                        peer_connection.setLocalDescription(local_description,
                            function() { 
                                signalingSocket.emit('relaySessionDescription', 
                                    {'peer_id': peer_id, 'session_description': local_description});
                                console.log("Offer setLocalDescription succeeded"); 
                            },
                            function() { Alert("Offer setLocalDescription failed!"); }
                        );
                    },
                    function (error) {
                        console.log("Error sending offer: ", error);
                    });
            }
            
        });
    
        this.signalingSocket.on('sessionDescription', function(config) {
            console.log('Remote description received: ', config);
            let peer_id = config.peer_id;
            let peer = peers[peer_id];
            let remote_description = config.session_description;
            console.log(config.session_description);

            let desc = new RTCSessionDescription(remote_description);
            let stuff = peer.setRemoteDescription(desc, 
                function() {
                    console.log("setRemoteDescription succeeded");
                    if (remote_description.type == "offer") {
                        console.log("Creating answer");
                        peer.createAnswer(
                            function(local_description) {
                                console.log("Answer description is: ", local_description);
                                peer.setLocalDescription(local_description,
                                    function() { 
                                        signalingSocket.emit('relaySessionDescription', 
                                            {'peer_id': peer_id, 'session_description': local_description});
                                        console.log("Answer setLocalDescription succeeded");
                                    },
                                    function() { Alert("Answer setLocalDescription failed!"); }
                                );
                            },
                            function(error) {
                                console.log("Error creating answer: ", error);
                                console.log(peer);
                            });
                    }
                },
                function(error) {
                    console.log("setRemoteDescription error: ", error);
                }
            );
            console.log("Description Object: ", desc);
        });

        this.signalingSocket.on('iceCandidate', function(config) {
            let peer = peers[config.peer_id];
            let ice_candidate = config.ice_candidate;
            peer.addIceCandidate(new RTCIceCandidate(ice_candidate));
        });

        this.signalingSocket.on('removePeer', function(config) {
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

    attachMediaStream = function (element, stream) {
        console.log('In attachMediaStream', stream )
        element.srcObject = stream;
    }

    getLocalMediaStream = function () {
        return this.localMediaStream
    }

    setLocalMediaStream = function(stream) {
        if (this.localMediaStream === null) {
            this.localMediaStream = stream
        };
        this.setState({
            localVideo: this.state.localVideo.concat(<LocalVideo key='test1' stream={stream}/>)
        })
    };

    setupLocalMedia = function (callback, errorback) {
        if (this.localMediaStream != null) {  
            this.setLocalMediaStream()
            if (callback) callback();
            return; 
        }
        console.log("Requesting access to local audio / video inputs");
        navigator.getUserMedia = ( navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia); 
        let setLocalMediaStream = this.setLocalMediaStream;
        let attachMediaStream = this.attachMediaStream;            
        navigator.getUserMedia({"audio":'true', "video":'true'},
            function(stream) { 
                setLocalMediaStream(stream);
                if (callback) callback();
            },
            function() { 
                console.log("Access denied for audio/video");
                if (errorback) errorback();
            });
    }


    joinChatChannel = function (channel, userdata) {
        this.signalingSocket.emit('join', {"channel": channel, "userdata": userdata});
    }
        
    partChatChannel = function (channel) {
        this.signalingSocket.emit('part', channel);
        for (let track of this.localMediaStream.getTracks()) {
            track.stop()
        }
        this.localMediaStream = null
    }

    startVideo = function () {
        console.log('In startVideo')
        if (this.state.localVideo.length > 0) {
            return
        }
        let joinChatChannel = this.joinChatChannel
        let DEFAULT_CHANNEL = 'videochat';
        let user = this.props.user
        this.setupLocalMedia(function() {
            joinChatChannel(DEFAULT_CHANNEL, user);
        });
    }

    endVideo = function () {
        if (this.localMediaStream === null) {
            return
        }
        this.partChatChannel('videochat');
        this.setState({
            localVideo: []
        })
    }

    //render audio/video
    render() {
        return (
            <div id="remotesVideos">
                <Button.Group labeled>
                    <Button circular icon='play' id="startButton" size='small' color='green' onClick={this.startVideo.bind(this)}/>
                    <Button circular icon='stop' id="hangupButton" size='small' color='red' onClick={this.endVideo.bind(this)} />
                </Button.Group>
                <br /><br />
                <div id='localVideo'>
                    {this.state.localVideo}   
                </div>    
                <div id='peers'>
               </div>     
            </div>
        )
    }
};

export default GroupChat;