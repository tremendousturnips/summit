import React, {Component} from 'react';
import { Search } from 'semantic-ui-react'
import debounce from 'lodash/debounce';
import axios from 'axios';

class RoomSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: false
    }
  }

  debouncedSearch = debounce((e) => {
    axios.get(`/api/rooms/search?q=${e.target.value}`)
      .then((res)=> {
        const rooms = res.data.map(room => {
          return {title: room.name, id: room.id, description: room.description}
        });
        this.setState({
          results: rooms,
          isLoading: false
        })
      })
  },200);

  handleChange = (e) => {
    e.persist();
    this.setState({
      isLoading: true
    });
    this.debouncedSearch(e);
  };

  handleResultSelect = (e, {result}) => {
    this.props.joinRoom({...result, name: result.title});
  }

  render() {
    const {results, isLoading} = this.state;
    return (
      <Search input={{fluid: true}} onSearchChange={this.handleChange} results={results} loading={isLoading} onResultSelect={this.handleResultSelect} placeholder='Search for a room' fluid></Search>
    )
  }
} 

export default RoomSearch;