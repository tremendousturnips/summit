import { connect } from 'react-redux';
import { addMessage } from '../actions';
import MessageList from '../components/MessageList';

function mapStateToProps (state) {
  return {
    messages: state.messages
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (message) => {
      dispatch(addMessage(message));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MessageList);