import { connect } from 'react-redux';
import GroupChat from '../components/GroupChat';
//import { addMessage } from '../actions';

const mapStateToProps = ({ socket, user }) => ({ socket, user });

const mapDispatchToProps = (dispatch) => ({
//   addMessage: (message) => {
//     dispatch(addMessage(message));
//   }
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupChat);