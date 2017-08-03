import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Comment } from 'semantic-ui-react';
import MessageItem from './MessageItem';


class MessageList extends Component {
  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    const {socket, addMessage, addProfile} = this.props;
    socket.on('message', addMessage);
    socket.on('user entered', addProfile);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render () {
    const { messages, profiles, messagesByChannel, currentChannel } = this.props;
    return (
      <Comment.Group>
        {messagesByChannel[currentChannel.id].map((messageId) => <MessageItem profile={profiles[messages[messageId].user_id]} message={messages[messageId]} key={messageId}/> )}
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }} />
      </Comment.Group>
    );
  }
}


export default MessageList;
