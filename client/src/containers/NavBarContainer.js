import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
<<<<<<< HEAD
import { toggleVideoStat } from '../actions/toggleVideo';

const mapStateToProps = ({ toggleVideo }) => ({ toggleVideo });

const mapDispatchToProps = (dispatch) => ({
  toggleVideoStat: () => {
    dispatch(toggleVideoStat());
=======
import { toggleVideo } from '../actions/toggleVideo';

const mapStateToProps = ({ toogleVideo }) => ({ toggleVideo });

const mapDispatchToProps = (dispatch) => ({
  toggleVideo: (video) => {
    dispatch(toggleVideo());
>>>>>>> c0307b3152dfcd610ede47e238a00078a522e3c4
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);