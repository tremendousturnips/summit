import React, {Component} from 'react';
import { Dropdown, Modal, Form } from 'semantic-ui-react'
import RoomSearch from './RoomSearch';

const options = [
  {key: 'Room',
  text: 'Room',
  value: 'Room',
  content: 'Room'}
];

class RoomDropdown extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.fetchRooms();
  }

  handleChange(event, data) {
    this.props.changeRoom(data.value);
  }

  render() {
    return (
      <div>
         {/* <RoomSearch />  */}
         {/* <br/>  */}
         
        <Dropdown placeholder='Your Rooms' onChange={this.handleChange} fluid selection options={this.props.rooms || options}/>
      </div>
    );
  }
}

export default RoomDropdown;