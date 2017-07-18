import { connect } from 'react-redux';
import MessageList from '../components/MessageList';

const mapStateToProps = ({ messages }) => ({ messages });

export default connect(mapStateToProps)(MessageList);
