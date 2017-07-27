import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import { toggleVideoStat } from '../actions/toggleVideo';
import { showFriendListStat } from '../actions/showFriendList';

const mapStateToProps = ({ toggleVideo }) => ({ toggleVideo });

const mapDispatchToProps = (dispatch) => ({
  toggleVideoStat: () => {
    dispatch(toggleVideoStat());
  },
  showFriendListStat: () => {
    dispatch(showFriendListStat());
  } 
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);