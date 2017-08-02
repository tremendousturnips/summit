import React from 'react';
import {Comment, Message, Icon, Segment, Image, Popup} from 'semantic-ui-react';
import moment from 'moment';

const MessageItem = (props) => (
  <Comment>
    <Comment.Avatar as='a' src={props.profile.image}/>
    <Comment.Content>
      <Comment.Author as='a'>{props.profile.display}</Comment.Author>
      <Comment.Metadata>
        <Popup trigger={<div>{moment(props.message.created_at).format('h:hh A')}</div>}
        content={moment(props.message.created_at).format('LLL')} inverted size='mini'/>
      </Comment.Metadata>
      <Comment.Text>{props.message.text}</Comment.Text>
    </Comment.Content>
  </Comment>
);

export default MessageItem;