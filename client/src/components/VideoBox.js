import React, { Component } from 'react';
import { Button, Label, Segment } from 'semantic-ui-react';

class VideoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mute: true,
      muteText: 'Unmute'
    };
    this.toggleMute = this.toggleMute.bind(this);
  }

  componentDidMount() {
    document.getElementById(this.props.id).srcObject = this.props.stream; // TODO - REACTIFY
  }

  toggleMute() {
    this.setState({
      muteText: this.state.mute ? 'Mute' : 'Unmute',
      mute: !this.state.mute
    });
  }

  render() {
    // const video = <video autoPlay height="100" width="100" id={this.props.id} muted={this.state.mute} />;
    // video.srcObject = this.props.stream;
    return (
      <div>
        <video autoPlay height="100" width="100" id={this.props.id} muted={this.state.mute} />
        <br />
        <Button
          toggle
          active={this.state.mute}
          onClick={this.toggleMute}
          compact
        >
          {this.state.muteText}
        </Button>
      </div>
    );
  }
}

export default VideoBox;
