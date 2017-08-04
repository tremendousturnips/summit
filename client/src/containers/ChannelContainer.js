import { connect } from 'react-redux';
import ChannelList from '../components/ChannelList';
import { selectChannel, postChannel, addChannel, receiveChannel } from '../actions/channels';

const mapStateToProps = ({channels, currentChannel, currentRoom, channelsByRoom, socket, incomingCount}) => ({channels, currentChannel, channelsByRoom, currentRoom, socket, incomingCount})

const mapDispatchToProps = (dispatch) => ({
  selectChannel: (channelId) => {
    dispatch(selectChannel(channelId));
  },
  postChannel: (channel) => {
    dispatch(postChannel(channel));
  },
  receiveChannel: (channel) => {
    dispatch(receiveChannel(channel));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);