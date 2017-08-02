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
    const {socket, addMessage} = this.props;
    socket.on('message', addMessage);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render () {
    const { messages, profiles } = this.props;
    return (
      <Comment.Group>
        {messages.map((message, index) => <MessageItem profile={profiles[message.user_id]} message={message} key={index}/> )}
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }} />
      </Comment.Group>
    );
  }
}


export default MessageList;
