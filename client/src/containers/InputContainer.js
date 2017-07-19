import { connect } from 'react-redux';
import MessageInput from '../components/MessageInput';
import { postMessage } from '../actions/messages';

const mapStateToProps = ({ user, socket }) => ({ user, socket });

const mapDispatchToProps = dispatch => ({
  postMessage: (message) => dispatch(postMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageInput);