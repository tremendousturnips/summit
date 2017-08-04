import { connect } from 'react-redux';
import VideoChat from '../components/VideoChat';
//import { getVideo } from '../actions/toggleVideo';

const mapStateToProps = ({ socket, user, toggleVideo, currentRoom }) => ({ socket, user, toggleVideo, currentRoom });

const mapDispatchToProps = (dispatch) => ({
//   getVideo: (videoStat) => {
//     dispatch();
//   }
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoChat);
