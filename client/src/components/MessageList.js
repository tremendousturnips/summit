import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Comment } from 'semantic-ui-react';
import MessageItem from './MessageItem';

class MessageList extends Component {
  componentDidMount() {
    console.log(this.props);
    const {socket, addMessage, fetchMessages} = this.props;
    socket.emit('subscribe', 1)
    socket.on('message', addMessage);
    fetchMessages(1,1);
  }
  render () {
    const { messages } = this.props;
    return (
      <Comment.Group>
        {messages.map((message, index) => <MessageItem message={message} key={index}/> )}
      </Comment.Group>
    );
  }
}
MessageList.propTypes = {
  messages: PropTypes.array.isRequired
};

export default MessageList;
