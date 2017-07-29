import React, {Component} from 'react';
import { Search } from 'semantic-ui-react'

class RoomSearch extends Component {
  render() {
    return (
      <Search placeholder='Search for a room' size='tiny' fluid></Search>
    )
  }
} 

export default RoomSearch;