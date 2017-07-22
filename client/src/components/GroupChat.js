import React from 'react';
import { connect } from 'react-redux';
import { Button, Label } from 'semantic-ui-react'; 
import $ from 'jquery';

class GroupChat extends React.Component {

    constructor(props) {
        super (props)
        this.signalingSocket = this.props.socket;  
        this.localMediaStream = null; 
        this.peers = {};               
        this.peerMediaElements = {}; 

        this.startVideo = this.startVideo.bind(this)
        this.endVideo = this.endVideo.bind(this)
        this.attachMediaStream = this.attachMediaStream.bind(this)
        this.setLocalMediaStream = this.setLocalMediaStream.bind(this)
        this.setupLocalMedia = this.setupLocalMedia.bind(this)
        this.joinChatChannel = this.joinChatChannel.bind(this)
        this.partChatChannel = this.partChatChannel.bind(this)
        this.getLocalMediaStream = this.getLocalMediaStream.bind(this)
        this.pauseMediaStream = this.pauseMediaStream.bind(this)

    }

    componentDidMount() {

        var ICE_SERVERS = [{"url":"stun:global.stun.twilio.com:3478?transport=udp"},
        {"url":"turn:global.turn.twilio.com:3478?transport=udp",
        "username":"21ec244c825a533da292cef0169c27004ddfaa8263a058f05ac0581502f5eef7",
        "credential":"+H38m72VGDFW/JNI8dk8fGpDSbAPPiKVy9tC9jjUxaY="},
        {"url":"turn:global.turn.twilio.com:3478?transport=tcp",
        "username":"21ec244c825a533da292cef0169c27004ddfaa8263a058f05ac0581502f5eef7",
        "credential":"+H38m72VGDFW/JNI8dk8fGpDSbAPPiKVy9tC9jjUxaY="},
        {"url":"turn:global.turn.twilio.com:443?transport=tcp",
        "username":"21ec244c825a533da292cef0169c27004ddfaa8263a058f05ac0581502f5eef7",
        "credential":"+H38m72VGDFW/JNI8dk8fGpDSbAPPiKVy9tC9jjUxaY="}];

        let USE_AUDIO = true;
        let USE_VIDEO = true;
        let MUTE_AUDIO_BY_DEFAULT = true;
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
                console.log('In on icecandicate')
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
                //var remote_media = USE_VIDEO ? $("<video>") : $("<audio>");
                remote_media.setAttribute("autoPlay", "");
                remote_media.setAttribute("height", "100");
                remote_media.setAttribute("width", "100");
                remote_media.setAttribute("id", peer_id);
                if (MUTE_AUDIO_BY_DEFAULT) {
                    remote_media.setAttribute("muted", "true");
                }
                peerMediaElements[peer_id] = remote_media;
                document.getElementById('peers').append(remote_media);
                attachMediaStream(remote_media, event.stream);
            }

            peer_connection.ontrack = function(event) {
                console.log("ontrack", event);
                let remote_media = document.createElement('video');
                //var remote_media = USE_VIDEO ? $("<video>") : $("<audio>");
                remote_media.setAttribute("autoPlay", "");
                remote_media.setAttribute("height", "100");
                remote_media.setAttribute("width", "100");
                remote_media.setAttribute("id", peer_id);
                if (MUTE_AUDIO_BY_DEFAULT) {
                    remote_media.setAttribute("muted", "true");
                }
                peerMediaElements[peer_id] = remote_media;
                document.getElementById('peers').append(remote_media);
                attachMediaStream(remote_media, event.stream);
            }
            
            if (localMediaStream === undefined || localMediaStream === null) {
                localMediaStream = getLocalMediaStream()
            }

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
        element.srcObject = stream;
    };

    pauseMediaStream = function (element, stream) {
        element.pause()
        element.srcObject = "";
    }
    
    getLocalMediaStream = function () {
        return this.localMediaStream
    }

    setLocalMediaStream = function(stream) {
        let local_media = document.createElement('video');
        local_media.setAttribute("autoPlay", "");
        local_media.setAttribute("height", "100");
        local_media.setAttribute("width", "100");
        local_media.setAttribute("id", 'localVideoStream');
        local_media.setAttribute("muted", "true");
        document.getElementById('localVideo').append(local_media);
        if (this.localMediaStream === null) {
            this.localMediaStream = stream
            console.log('localMediaStream after udate0.1', Object.keys(this.localMediaStream).length)
        }
        console.log('localMediaStream after udate', this.localMediaStream )
        this.attachMediaStream(local_media, this.localMediaStream);
    }

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
        document.getElementById('localVideoStream').remove();
        for (let track of this.localMediaStream.getTracks()) {
            track.stop()
        }
        this.localMediaStream = null
    }

    startVideo = function () {
        console.log('In startVideo')
        let joinChatChannel = this.joinChatChannel
        let DEFAULT_CHANNEL = 'videochat';
        this.setupLocalMedia(function() {
            joinChatChannel(DEFAULT_CHANNEL, {'first video chat': 'user1'});
        });
    }

    endVideo = function () {
        if (this.localMediaStream === null) {
            return
        }
        this.partChatChannel('videochat');
        //this.signalingSocket.emit('disconnect', 'videochat');
    }

    //render audio/video
    render() {
        return (
            <div id="remotesVideos">
                <div>
                    <Button.Group labeled>
                        <Button circular icon='play' id="startButton" size='small' color='green' onClick={this.startVideo.bind(this)}/>
                        <Button circular icon='stop' id="hangupButton" size='small' color='red' onClick={this.endVideo.bind(this)} />
                    </Button.Group>
                </div>
                <div id='localVideo'>
                </div>    
                <div id='peers'>
               </div>     
            </div>
        )
    }
};

export default GroupChat;