import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';

class VideoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muted: this.props.id === 'localMediaStream'
    };
    this.toggleMute = this.toggleMute.bind(this);
  }

  componentDidMount() {
    const { id, stream } = this.props;
    document.getElementById(id).srcObject = stream;
  }

  toggleMute() {
    this.setState({
      muted: !this.state.muted
    });
  }

  render() {
    const { id } = this.props;
    const { muted } = this.state;
    return (
      <div className="video-box">
        <video
          className="stream-container"
          autoPlay
          height="150"
          width="200"
          id={id}
          muted={muted}
        />
        <br />
        {id !== 'localMediaStream'
          ? <Button
              className="mute-button"
              toggle
              active={!muted}
              color="red"
              onClick={this.toggleMute}
              compact
            >
              <Icon name={muted ? 'microphone' : 'microphone slash'} />
              {muted ? 'Unmute' : 'Mute'}
            </Button>
          : ''}
      </div>
    );
  }
}

export default VideoBox;
