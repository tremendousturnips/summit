import { connect } from 'react-redux';
import MessageInput from '../components/MessageInput';
import { postMessage } from '../actions/messages';

const mapStateToProps = ({ user, socket, currentChannel }) => ({ user, socket, currentChannel });

const mapDispatchToProps = dispatch => ({
  postMessage: (message) => dispatch(postMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);