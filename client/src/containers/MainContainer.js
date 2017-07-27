import { connect } from 'react-redux';
import Main from '../components/Main';
//import { getVideo } from '../actions/toggleVideo';

const mapStateToProps = ({ showFriendList }) => ({ showFriendList });

const mapDispatchToProps = (dispatch) => ({
//   getVideo: (videoStat) => {
//     dispatch();
//   }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);