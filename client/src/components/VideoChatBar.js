import React, { Component } from 'react';
import { Icon, Label } from 'semantic-ui-react';

import VideoChatContainer from '../containers/VideoChatContainer';

class VideoChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.toggleVideo
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    const { visible } = this.state;
    return visible
      ? <div className="video-chat-bar">
          <Label>
            <Icon name="video" /> Video Chat
          </Label>
          <VideoChatContainer />
        </div>
      : null;
  }
}

export default VideoChatBar;

