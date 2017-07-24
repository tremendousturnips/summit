import { connect } from 'react-redux';
import VideoChatBar from '../components/VideoChatBar';

const mapStateToProps = ({ toggleVideo }) => ({ toggleVideo });

export default connect(mapStateToProps)(VideoChatBar);
