import React from 'react';
import {Comment, Message} from 'semantic-ui-react';

const MessageItem = (props) => (
  <Comment as={Message}>
    <Comment.Avatar src='./IMAGE.jpg' />
    <Comment.Content>
      <Comment.Author as='a'>Matt</Comment.Author>
      <Comment.Metadata>
        <div>Today at 5:42PM</div>
      </Comment.Metadata>
      <Comment.Text>How artistic!</Comment.Text>
    </Comment.Content>
  </Comment>
);

export default MessageItem;