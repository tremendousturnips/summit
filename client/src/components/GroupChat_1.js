import React from 'react';
import { connect } from 'react-redux';
import SimpleWebRTC from 'simplewebrtc';
import { Button } from 'semantic-ui-react'; 

class GroupChat extends React.Component {

    constructor(props) {
        super (props)
        this.socket = this.props.socket;

    }

    //Communicate audio/video over channel
    componentWillMount() {
        console.log('url', window.location.href);
        let socket = this.socket
        this.webrtc = new SimpleWebRTC({
            media: {
                audio: true,
                video: {
                    width: { min: 300, ideal: 500, max: 1920 },
                    height: { min: 300, ideal: 500, max: 1080 }
                }
            },

            // the id/element dom element that will hold "our" video
            localVideoEl: 'localVideo',
            // the id/element dom element that will hold remote videos
            remoteVideosEl: '',

            // immediately ask for camera access
            autoRequestMedia: true,

        //     //required url for signaling server. Defaults to signaling server URL which can be used for 
            //development. You must use your own signaling server for production.
            url: window.location.href,

            //optional object to be passed as options to the signaling server connection.
            socketio: socket

        //     //
        });

        this.webrtc.on('connect', function () {
            self.emit('connectionReady', this.webrtc.getSessionid());
            self.sessionReady = true;
            self.testReadiness();
        });

        // a peer video has been added
        this.webrtc.on('videoAdded', function (video, peer) {
            console.log('video added', peer);
            var remotes = document.getElementById('remotes');
            if (remotes) {
                var container = document.createElement('div');
                container.className = 'videoContainer';
                container.id = 'container_' + webrtc.getDomId(peer);
                container.appendChild(video);

                // suppress contextmenu
                video.oncontextmenu = function () { return false; };

                remotes.appendChild(container);
            }
        });

        // a peer video was removed
        this.webrtc.on('videoRemoved', function (video, peer) {
            console.log('video removed ', peer);
            var remotes = document.getElementById('remotes');
            var el = document.getElementById(peer ? 'container_' + webrtc.getDomId(peer) : 'localScreenContainer');
            if (remotes && el) {
                remotes.removeChild(el);
            }
        });
        
        // helper function to show the volume
        function showVolume(el, volume) {
            console.log('showVolume', volume, el);
            if (!el) return;
            if (volume < -45) volume = -45; // -45 to -20 is
            if (volume > -20) volume = -20; // a good range
            el.value = volume;
        }

        //helper function for Volume control
        // show the remote volume
        // var vol = document.createElement('meter');
        // vol.id = 'volume_' + peer.id;
        // vol.className = 'volume';
        // vol.min = -45;
        // vol.max = -20;
        // vol.low = -40;
        // vol.high = -25;
        // container.appendChild(vol);

        // local volume has changed
        // webrtc.on('volumeChange', function (volume, treshold) {
        //     showVolume(document.getElementById('localVolume'), volume);
        // });

        // // remote volume has changed
        // webrtc.on('remoteVolumeChange', function (peer, volume) {
        //     showVolume(document.getElementById('volume_' + peer.id), volume);
        // });

        this.webrtc.on('connectionReady', function (sessionId) {
            console.log(sessionId)
        });

        this.webrtc.on('createdPeer', function (peer) {
            console.log(peer)
        });

        this.webrtc.on('leftRoom', function (roomName) {
            console.log(roomName)
        });
    }

    componentDidMount() {
        // we have to wait until it's ready
        this.webrtc.on('readyToCall', function () {
            console.log('In readyToCall')
        });

        // you can name it anything
        this.webrtc.joinRoom('room1', function() {
            console.log('In joinRoom')
        });
    }

    startVideo = function () {
        console.log('In startVideo')
        this.webrtc.emit('join', 'test');
    }

    endVideo = function () {
        pc1.close();
        pc2.close();
        pc1 = null;
        pc2 = null;
    }

    //render audio/video
    render() {
        return (
            <div id="remotesVideos">
                <video height="100" width="100" id="localVideo"></video>
                <div id="remoteVideos"></div>
                    <div>
                    {/* <button id="callButton">Call</button> */}
                    <Button.Group labeled>
                        <Button circular icon='play' id="startButton" size='small' color='green' onClick={this.startVideo.bind(this)}/>
                        <Button circular icon='stop' id="hangupButton" size='small' color='red' onClick={this.endVideo.bind(this)} />
                    </Button.Group>
                </div> 
            </div>
        )
    }
};

export default GroupChat;