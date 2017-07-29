import { connect } from 'react-redux';
import AddFriendItem from '../components/AddFriendItem';
//import { getVideo } from '../actions/toggleVideo';

const mapStateToProps = ({ profiles, friends, user }) => ({ profiles, friends, user });

const mapDispatchToProps = (dispatch) => ({
//   getVideo: (videoStat) => {
//     dispatch();
//   }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFriendItem);