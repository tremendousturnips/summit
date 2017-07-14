import React, {Component} from 'react';
import { Comment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import MessageItem from '../components/MessageItem';
class MessageList extends Component {

  renderList() {
    return this.props.messages.map((message, index) => {
      return <MessageItem message={message} key={index}/>
    });
  }
  render() {
    return (
      <Comment.Group>
        {this.renderList()}
      </Comment.Group>
    );
  }
}
  
function mapStateToProps (state) {
  return {
    messages: state.messages
  }
};

export default connect(mapStateToProps)(MessageList);