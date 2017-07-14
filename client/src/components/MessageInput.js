import React from 'react';
import {Segment, Input} from 'semantic-ui-react';
const MessageInput = () => (
  <Segment attached='bottom'>
    <Input fluid action={{ icon: 'add' }} size='huge' placeholder='Enter Message...' />
  </Segment>
)

export default MessageInput;