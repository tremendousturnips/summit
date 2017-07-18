import { connect } from 'react-redux';
import { addMessage } from '../actions';
import MessageInput from '../components/MessageInput';

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (message) => {
    dispatch(addMessage(message));
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(MessageInput);