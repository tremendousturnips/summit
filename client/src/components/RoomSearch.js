import React, {Component} from 'react';
import { Search } from 'semantic-ui-react'
import debounce from 'lodash/debounce';

class RoomSearch extends Component {

  debouncedSearch = debounce((e) => {
    console.log(e.target.value);
  },200);
  
  handleChange = (e) => {
    e.persist();
    this.debouncedSearch(e);
  };
  render() {
    return (
      <Search input={{fluid: true}} onSearchChange={this.handleChange} placeholder='Search for a room' fluid></Search>
    )
  }
} 

export default RoomSearch;