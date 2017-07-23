import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import { toggleVideo } from '../actions/toggleVideo';

const mapStateToProps = ({ toogleVideo }) => ({ toggleVideo });

const mapDispatchToProps = (dispatch) => ({
  toggleVideo: (video) => {
    dispatch(toggleVideo());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);