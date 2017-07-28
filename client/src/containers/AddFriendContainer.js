import { connect } from 'react-redux';
import AddFriend from '../components/AddFriend';
//import { getVideo } from '../actions/toggleVideo';

const mapStateToProps = ({ profiles, friends }) => ({ profiles, friends });

const mapDispatchToProps = (dispatch) => ({
//   getVideo: (videoStat) => {
//     dispatch();
//   }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend);