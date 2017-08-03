import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import { toggleVideoStat } from '../actions/toggleVideo';

const mapStateToProps = ({ toggleVideo }) => ({ toggleVideo });

const mapDispatchToProps = (dispatch) => ({
  toggleVideoStat: () => {
    dispatch(toggleVideoStat());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
