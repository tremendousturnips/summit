import React from 'react';
import {Comment, Message, Icon} from 'semantic-ui-react';

const MessageItem = (props) => (
  <Comment as={Message}>
     {console.log('messageItem: ',props)} 
    <Icon name='user'/>
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