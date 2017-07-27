import { connect } from 'react-redux';
import FriendListItem from '../components/FriendListItem';
//import { getVideo } from '../actions/toggleVideo';

const mapStateToProps = ({ friends }) => ({ friends });

const mapDispatchToProps = (dispatch) => ({
//   getVideo: (videoStat) => {
//     dispatch();
//   }
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendListItem);