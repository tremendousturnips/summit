import React from 'react';
import { connect } from 'react-redux';
import { Button, Label } from 'semantic-ui-react'; 
import $ from 'jquery';

class GroupChat extends React.Component {

    constructor(props) {
        super (props)
        this.signaling_socket = this.props.socket;  
        this.local_media_stream = null; 
        this.peers = {};               
        this.peer_media_elements = {}; 

        this.startVideo = this.startVideo.bind(this)
        this.endVideo = this.endVideo.bind(this)
        this.attachMediaStream = this.attachMediaStream.bind(this)
        this.setLocalMediaStream = this.setLocalMediaStream.bind(this)
        this.setup_local_media = this.setup_local_media.bind(this)
        this.join_chat_channel = this.join_chat_channel.bind(this)
        this.part_chat_channel = this.part_chat_channel.bind(this)

    }

    // componentWillMount() {
    //     console.log('url', window.location.href);
    //     let socket = this.socket
        
    // }

    componentDidMount() {

        var ICE_SERVERS = [{"url":"stun:global.stun.twilio.com:3478?transport=udp"},
        {"url":"turn:global.turn.twilio.com:3478?transport=udp",
        "username":"f65cf69e15b57ecc4f6b9d5fc0e4242b244b50d7dae1c7bf9133ea2a3b86081c",
        "credential":"3CYsqO4NpVKT4uLXjndrXgCn1wMBv86rabLYZZdM6NE="},
        {"url":"turn:global.turn.twilio.com:3478?transport=tcp",
        "username":"f65cf69e15b57ecc4f6b9d5fc0e4242b244b50d7dae1c7bf9133ea2a3b86081c",
        "credential":"3CYsqO4NpVKT4uLXjndrXgCn1wMBv86rabLYZZdM6NE="},
        {"url":"turn:global.turn.twilio.com:443?transport=tcp",
        "username":"f65cf69e15b57ecc4f6b9d5fc0e4242b244b50d7dae1c7bf9133ea2a3b86081c",
        "credential":"3CYsqO4NpVKT4uLXjndrXgCn1wMBv86rabLYZZdM6NE="}];

        let USE_AUDIO = true;
        let USE_VIDEO = true;
        let MUTE_AUDIO_BY_DEFAULT = true;

        this.signaling_socket.on('connect', function() {
            console.log("Connected to signaling server");
        });

        this.signaling_socket.on('disconnect', function() {
            console.log("Disconnected from signaling server");
 
            for (var peer_id in this.peer_media_elements) {
                this.peer_media_elements[peer_id].remove();
            }
            for (var peer_id in this.peers) {
                this.peers[peer_id].close();
            }
            this.peers = {};
            this.peer_media_elements = {};
        });

        this.signaling_socket.on('addPeer', function(config) {
            console.log('Signaling server said to add peer:', config);
            let peer_id = config.peer_id;
            if (this.peers[peer_id]) {
                console.log("Already connected to peer ", peer_id);
                return;
            }
            var peer_connection = new RTCPeerConnection(
                {"iceServers": ICE_SERVERS},
                {"optional": [{"DtlsSrtpKeyAgreement": true}]} 
            );
            this.peers[peer_id] = peer_connection;
            peer_connection.onicecandidate = function(event) {
                if (event.candidate) {
                    this.signaling_socket.emit('relayICECandidate', {
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
                this.peer_media_elements[peer_id] = remote_media;
                document.getElementById('peers').append(remote_media);
                attachMediaStream(remote_media, event.stream);
            }

            if (config.should_create_offer) {
                console.log("Creating RTC offer to ", peer_id);
                peer_connection.createOffer(
                    function (local_description) { 
                        console.log("Local offer description is: ", local_description);
                        peer_connection.setLocalDescription(local_description,
                            function() { 
                                this.signaling_socket.emit('relaySessionDescription', 
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
            
            peer_connection.addStream(this.local_media_stream);
        });
    
        this.signaling_socket.on('sessionDescription', function(config) {
            console.log('Remote description received: ', config);
            let peer_id = config.peer_id;
            let peer = this.peers[peer_id];
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
                                        this.signaling_socket.emit('relaySessionDescription', 
                                            {'peer_id': peer_id, 'session_description': local_description});
                                        console.log("Answer setLocalDescription succeeded");
                                    },
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

        this.signaling_socket.on('iceCandidate', function(config) {
            let peer = this.peers[config.peer_id];
            let ice_candidate = config.ice_candidate;
            peer.addIceCandidate(new RTCIceCandidate(ice_candidate));
        });

        this.signaling_socket.on('removePeer', function(config) {
            console.log('Signaling server said to remove peer:', config);
            let peer_id = config.peer_id;
            if (peer_id in this.peer_media_elements) {
                this.peer_media_elements[peer_id].remove();
            }
            if (peer_id in this.peers) {
                this.peers[peer_id].close();
            }
            delete this.peers[peer_id];
            delete this.peer_media_elements[config.peer_id];
        });
    }

    attachMediaStream = function (element, stream) {
        element.srcObject = stream;
    };

    setLocalMediaStream = function(stream) {
        let local_media = document.createElement('video');
        local_media.setAttribute("autoPlay", "");
        local_media.setAttribute("height", "100");
        local_media.setAttribute("width", "100");
        local_media.setAttribute("id", 'localVideoStream');
        local_media.setAttribute("muted", "true");
        document.getElementById('localVideo').append(local_media);
        if (this.local_media_stream === null) {
            this.local_media_stream = stream
        }
        this.attachMediaStream(local_media, this.local_media_stream);
    }

    setup_local_media = function (callback, errorback) {
        if (this.local_media_stream != null) {  
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


    join_chat_channel = function (channel, userdata) {
        this.signaling_socket.emit('join', {"channel": channel, "userdata": userdata});
    }
        
    part_chat_channel = function (channel) {
        this.signaling_socket.emit('part', channel);
        document.getElementById('localVideoStream').remove();
        //this.signaling_socket.emit('disconnect')
    }

    startVideo = function () {
        console.log('In startVideo')
        let join_chat_channel = this.join_chat_channel
        let DEFAULT_CHANNEL = 'videochat';
        this.setup_local_media(function() {
            join_chat_channel(DEFAULT_CHANNEL, {'first video chat': 'user1'});
        });
    }

    endVideo = function () {
        this.part_chat_channel('videochat')
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