import { connect } from 'react-redux';
import { addMessage } from '../actions';
import MessageList from '../components/MessageList';

const mapStateToProps ({ messages }) => ({ messages });

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (message) => {
    dispatch(addMessage(message));
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(MessageList);
