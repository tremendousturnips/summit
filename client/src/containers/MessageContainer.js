import { connect } from 'react-redux';
import MessageList from '../components/MessageList';
import { addMessage, fetchMessages } from '../actions/messages';
import { addProfile } from '../actions/profiles';

const mapStateToProps = ({ messages, messagesByChannel, socket, currentChannel, profiles}) => { 
  return {
    // messages: messages.filter(message => message.channel_id === currentChannel.id),
    messages,
    messagesByChannel,
    socket,
    currentChannel,
    profiles
  };
};

const mapDispatchToProps = dispatch => ({
  addMessage: message => {
    dispatch(addMessage(message));
  },
  addProfile: profile => {
    dispatch(addProfile(profile));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
