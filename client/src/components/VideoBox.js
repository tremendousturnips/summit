import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';

class VideoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muted: false
    };
    this.toggleMute = this.toggleMute.bind(this);
  }

  componentDidMount() {
    const { id, stream } = this.props;
    document.getElementById(id).srcObject = stream;
  }

  toggleMute() {
    const { toggleAudio, id } = this.props;
    this.setState({
      muted: !this.state.muted
    });
    toggleAudio(id);
  }

  render() {
    const { id } = this.props;
    const { muted } = this.state;
    const buttonText =
      id === 'localMediaStream'
        ? muted ? 'Join Audio' : 'Leave Audio'
        : muted ? 'Unmute' : 'Mute';

    return (
      <div className="video-box">
        <video
          className="stream-container"
          autoPlay
          height="150"
          width="200"
          id={id}
          muted={id === 'localMediaStream' ? true : muted}
        />
        <br />
        <Button
          className="mute-button"
          toggle
          active={muted}
          color="red"
          onClick={this.toggleMute}
          compact
        >
          <Icon name={muted ? 'microphone' : 'microphone slash'} />
          {buttonText}
        </Button>
      </div>
    );
  }
}

export default VideoBox;
