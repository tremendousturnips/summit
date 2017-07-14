import React from 'react';
import {Segment, Input} from 'semantic-ui-react';
const MessageInput = (props) => (
  <Segment attached='bottom'>
    <Input fluid action={{ content:'Send', icon: 'send' }} size='medium' placeholder='Enter Message...' />
  </Segment>
)

export default MessageInput;