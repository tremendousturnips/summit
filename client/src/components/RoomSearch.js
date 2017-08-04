import React, { Component } from 'react';
import { Search, Icon, Modal, Button } from 'semantic-ui-react';
import debounce from 'lodash/debounce';
import axios from 'axios';
import AddRoom from './AddRoom';

class RoomSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
      open: false
    };
    this.close = this.close.bind(this);
  }
  show = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  debouncedSearch = debounce(e => {
    const query = e.target.value.trim();
    if (query.length) {
      this.setState({
        isLoading: true
      });
      axios.get(`/api/rooms/search?q=${query}`).then(res => {
        const rooms = res.data.map(room => {
          return { title: room.name, id: room.id, description: room.description };
        });
        this.setState({
          results: rooms,
          isLoading: false
        });
      });
    }
  }, 200);

  handleChange = e => {
    e.persist();
    this.debouncedSearch(e);
  };

  handleResultSelect = (e, { result }) => {
    this.props.joinRoom({ ...result, name: result.title });
  };

  render() {
    const { results, isLoading, open } = this.state;
    const { postRoom } = this.props;
    return (
      <div>
        <Search
          className="room-search"
          input={{ fluid: true }}
          onSearchChange={this.handleChange}
          results={results}
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          placeholder="Search rooms to join"
          fluid
          icon={{ name: 'add circle', circular: true, link: true, onClick: this.show }}
        />
        <AddRoom postRoom={postRoom} open={open} close={this.close}/>
      </div>
    );
  }
}

export default RoomSearch;
