import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import RoomSearch from './RoomSearch';
import AddRoom from './AddRoom';

const options = [
  {
    key: 'Room',
    text: 'Room',
    value: 'Room',
    content: 'Room'
  }
];

class RoomDropdown extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchRooms();
  }

  handleChange(event, data) {
    this.props.changeRoom(data.value);
  }

  render() {
    const { rooms, postRoom, joinRoom } = this.props;
    return (
      <div className="room-dropdown">
        <RoomSearch joinRoom={joinRoom} postRoom={postRoom}/>
        <br />
        {/* <AddRoom postRoom={postRoom} /> */}
        <h4>Current Room</h4>
        <Dropdown
          placeholder="Your Rooms"
          onChange={this.handleChange}
          fluid
          selection
          options={rooms || options}
        />
      </div>
    );
  }
}

export default RoomDropdown;
