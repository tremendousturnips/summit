import { connect } from 'react-redux';
import DirectMessageList from '../components/DirectMessageList';
//import { showFriendListStat } from '../actions/showFriendList';

const mapStateToProps = ({ user, directs, profiles, messages }) => ({ user, directs, profiles, messages });

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(DirectMessageList);