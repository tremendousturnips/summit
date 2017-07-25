import React, { Component } from 'react';
import { Button, Label, Segment } from 'semantic-ui-react';

class LocalVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mute: true,
      muteText: 'Unmute'
    };
    this.toggleMute = this.toggleMute.bind(this);
  }

  toggleMute() {
    this.setState({
      muteText: this.state.mute ? 'Mute' : 'Unmute',
      mute: !this.state.mute
    });
  }

  componentDidMount() {
    document.getElementById('localVideoStream').srcObject = this.props.stream; // TODO - REACTIFY
  }

  render() {
    return (
      <div>
        <video autoPlay height="100" width="100" id="localVideoStream" muted={this.state.mute} />
        <br />
        <Button
          height="2"
          width="2"
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

export default LocalVideo;
