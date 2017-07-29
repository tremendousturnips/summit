import { connect } from 'react-redux';
import LeftMenu from '../components/LeftMenu';
import { fetchProfiles } from '../actions/profiles';

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => ({
  fetchProfiles: (roomId) => {
    dispatch(fetchProfiles(roomId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
