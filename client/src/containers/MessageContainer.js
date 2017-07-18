import { connect } from 'react-redux';
import { addMessage } from '../actions';
import MessageList from '../components/MessageList';

const mapStateToProps = ({ messages }) => ({ messages });

export default connect(mapStateToProps)(MessageList);
