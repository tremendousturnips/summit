import React, {Component} from 'react';
import { Search } from 'semantic-ui-react'

class RoomSearch extends Component {
  render() {
    return (
      <Search input={{fluid: true}} placeholder='Search for a room' fluid></Search>
    )
  }
} 

export default RoomSearch;