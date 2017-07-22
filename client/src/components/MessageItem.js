import React from 'react';
import {Comment, Message, Icon, Segment, Image} from 'semantic-ui-react';

const MessageItem = (props) => (
  <Comment>
    <Comment.Avatar as='a' src={props.profile.image}/>
    <Comment.Content>
      <Comment.Author as='a'>{props.profile.display}</Comment.Author>
      <Comment.Metadata>
        <div>{props.message.created_at}</div>
      </Comment.Metadata>
      <Comment.Text>{props.message.text}</Comment.Text>
    </Comment.Content>
  </Comment>
);

export default MessageItem;