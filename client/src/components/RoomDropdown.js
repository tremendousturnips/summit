import React, {Component} from 'react';
import { Dropdown, Modal, Form } from 'semantic-ui-react'

const options = [
  {key: 'Room',
  text: 'Room',
  value: 'Room',
  content: 'Room'}
];
class RoomDropdown extends Component {
  render() {
    return (
      <div>
        <Dropdown defaultValue={options[0].value} options={options}/>
      </div>
    );
  }
}

export default RoomDropdown;