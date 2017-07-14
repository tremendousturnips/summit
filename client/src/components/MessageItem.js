import React from 'react';
import {Comment, Message} from 'semantic-ui-react';

const MessageItem = (props) => (
  <Comment as={Message}>
    {console.log(props)}
    <Comment.Avatar src='./IMAGE.jpg' />
    <Comment.Content>
      <Comment.Author as='a'>{props.message.username}</Comment.Author>
      <Comment.Metadata>
        <div>{props.message.timestamp}</div>
      </Comment.Metadata>
      <Comment.Text>{props.message.text}</Comment.Text>
    </Comment.Content>
  </Comment>
);

export default MessageItem;