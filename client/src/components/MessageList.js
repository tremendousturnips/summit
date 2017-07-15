import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Comment } from 'semantic-ui-react';
import MessageItem from './MessageItem';

const MessageList = ({ messages }) => (
  <Comment.Group>
    {console.log(' messageList 1: ', messages)}
    
    {messages.map((message, index) => {
      return <MessageItem message={message} key={index}/>
    })}
  </Comment.Group>
);

MessageList.propTypes = {
  messages: PropTypes.array
};

export default MessageList;