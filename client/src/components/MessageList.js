import React from 'react';
import {Comment} from 'semantic-ui-react';
import MessageItem from './MessageItem';
const MessageList = (props) => (
  <Comment.Group>
    <MessageItem/>
  </Comment.Group>
);

export default MessageList;