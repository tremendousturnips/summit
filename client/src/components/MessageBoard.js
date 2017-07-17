import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const MessageBoard = (props) => (
  <div>
    {console.log(props)}
    <MessageList messages={props.messages}/>
    <MessageInput onSubmit={props.onSubmit}/>
  </div>
);

export default MessageBoard;