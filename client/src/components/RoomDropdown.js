import React, {Component} from 'react';
import { Dropdown, Modal, Form } from 'semantic-ui-react'

const options = [
  {key: 'Room',
  text: 'Room with a super long ass namejklfdsjkal;jfkdlsa;j',
  value: 'Room',
  content: 'Room'}
];

class RoomDropdown extends Component {
  render() {
    return (
      <div>

        <Dropdown placeholder='Select a Room' fluid selection options={options}/>
      </div>
    );
  }
}

export default RoomDropdown;