import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Container, Label } from 'semantic-ui-react';

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
      ? <Container className="video-chat-bar">
          <Label>
            <Icon name="video" /> Video Chat
          </Label>
          <VideoChatContainer />
        </Container>
      : null;
  }
  // render() {
  //   const { visible } = this.state;
  //   return visible
  //     ? <Menu icon="labeled" horizontal>
  //         <Menu.Item name="video chat" icon="video" />
  //         <Menu.Menu>
  //           <VideoChatContainer />
  //         </Menu.Menu>
  //       </Menu>
  //     : null;
  // }
}

export default VideoChatBar;
