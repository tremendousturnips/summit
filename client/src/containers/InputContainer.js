import { connect } from 'react-redux';
import MessageInput from '../components/MessageInput';

const mapStateToProps = ({ user, socket }) => ({ user, socket });



export default connect(mapStateToProps)(MessageInput);