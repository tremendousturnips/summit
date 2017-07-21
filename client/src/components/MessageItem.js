import React from 'react';
import {Comment, Message, Icon, Segment} from 'semantic-ui-react';

const MessageItem = (props) => (
  <Comment as={Message}>
    <Icon name='user'/>
    <Comment.Content>
      <Comment.Author as='a'>{props.message.user_id}</Comment.Author>
      <Comment.Metadata>
        <div>{props.message.created_at}</div>
      </Comment.Metadata>
      <Comment.Text>{props.message.text}</Comment.Text>
    </Comment.Content>
  </Comment>
);

export default MessageItem;