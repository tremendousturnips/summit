import { connect } from 'react-redux';
import MessageList from '../components/MessageList';
import { addMessage } from '../actions';

const mapStateToProps = ({ messages, socket }) => ({ messages, socket });

const mapDispatchToProps = (dispatch) => ({
  addMessage: (message) => {
    console.log('addmessage inside container')
    dispatch(addMessage(message));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
