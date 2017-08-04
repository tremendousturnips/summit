import { connect } from 'react-redux';
import MessageList from '../components/MessageList';
import { receiveMessage, fetchMessages } from '../actions/messages';
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
  receiveMessage: message => {
    dispatch(receiveMessage(message));
  },
  addProfile: profile => {
    dispatch(addProfile(profile));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
