import { connect } from 'react-redux';
import DirectMessageList from '../components/DirectMessageList';

const mapStateToProps = ({ directs }) => 
                        ({ directs });

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(DirectMessageList);
