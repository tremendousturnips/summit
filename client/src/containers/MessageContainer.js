import { connect } from 'react-redux';
import { addMessage } from '../actions';
import MessageBoard from '../components/MessageBoard';

const mapStateToProps = ({ messages, user }) => ({ messages, user });

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (message) => {
    dispatch(addMessage(message));
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(MessageBoard);
