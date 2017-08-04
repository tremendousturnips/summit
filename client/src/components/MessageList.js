import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Comment } from 'semantic-ui-react';
import MessageItem from './MessageItem';

class MessageList extends Component {
  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({ behavior: 'smooth' });
  };

  componentDidMount() {
    const { socket, receiveMessage, addProfile } = this.props;
    socket.on('message', receiveMessage);
    socket.on('user entered', addProfile); //TODO: could refactor to only addProfile if profile store does not already contain profile.id
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const { messages, profiles, messagesByChannel, currentChannel, toggleVideo } = this.props;
    return (
      <Comment.Group className={`message-list ${toggleVideo ? 'downsize' : ''}`} size="large">
        {messagesByChannel[currentChannel.id].map(messageId =>
          <MessageItem
            profile={profiles[messages[messageId].user_id]}
            message={messages[messageId]}
            key={messageId}
          />
        )}
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={el => {
            this.messagesEnd = el;
          }}
        />
      </Comment.Group>
    );
  }
}

export default MessageList;
