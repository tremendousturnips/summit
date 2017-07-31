import { connect } from 'react-redux';
import LeftMenu from '../components/LeftMenu';
import { fetchProfiles } from '../actions/profiles';
import { fetchDirects } from '../actions/directs';

const mapStateToProps = ({ user, directs }) => ({ user, directs });

const mapDispatchToProps = (dispatch) => ({
  fetchProfiles: (roomId) => {
    dispatch(fetchProfiles(roomId));
  },
  fetchDirects: (userId) => {
    dispatch(fetchDirects(userId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
