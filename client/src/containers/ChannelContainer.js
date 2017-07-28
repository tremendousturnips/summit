import { connect } from 'react-redux';
import ChannelList from '../components/ChannelList';
import { selectChannel, postChannel } from '../actions/channels';

const mapStateToProps = ({channels, currentChannel}) => ({channels, currentChannel})

const mapDispatchToProps = (dispatch) => ({
  selectChannel: (channelId) => {
    dispatch(selectChannel(channelId));
  },
  postChannel: (channel) => {
    dispatch(postChannel(channel));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);