import React, {Component} from 'react';
import {Segment, Input} from 'semantic-ui-react';

class MessageInput extends Component {
  render() {
    return (
      <Segment attached='bottom'>
        <Input fluid action={{ content:'Send', icon: 'send' }} size='medium' placeholder='Enter Message...' />
      </Segment>
    )
  }
}


export default MessageInput;