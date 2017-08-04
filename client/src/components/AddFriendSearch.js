import React, { Component } from 'react'
import { Input, Label, Modal, Search } from 'semantic-ui-react'
import debounce from 'lodash/debounce';
import axios from 'axios';

class AddFriendSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: false
    };

    this.addNewFriend = this.addNewFriend.bind(this)
  }

  debouncedSearch = debounce(e => {
    const query = e.target.value.trim();
    const userId = this.props.user.id
    if (query.length) {
      this.setState({
        isLoading: true
      });
      axios
        //.get(`/api/rooms/search?q=${query}`)
        .get(`/api/profiles/${userId}/friends/search/${query}`)
        .then(res => {
          console.log(res.data)
          const users = res.data.map(user => {
            return { title: user.display, key: user.id, id: user.id, image: user.image };
          });
          this.setState({
            results: users,
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
    this.addNewFriend({ ...result, name: result.title });
  };

  addNewFriend (result) {
    let friendId = result.id
    if (this.props.directs[friendId]) {
      this.props.selectChannel(this.props.channels[this.props.directs[friendId].channel_id])
    } else if (!this.props.friends[friendId]) {
      let userId = this.props.user.id
      this.props.addFriend(userId, friendId)
      let friend = {
        user_id: userId,
        friend_id: friendId,
        status: 'Pending'
      };
      this.props.socket.emit('friend update', friend )
    }
    this.props.closeModal()
  }

  render() {
    const { results, isLoading } = this.state;
    return (
      <Modal.Header>
        <Search
          className="user-search"
          input={{ fluid: true }}
          onSearchChange={this.handleChange}
          results={results}
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          placeholder="Search users"
          size='small'
        />
      </Modal.Header>  
    );
  }
}
export default AddFriendSearch;

//     constructor(props) {
//       super (props)

//       this.state = {
//         input: ''
//       }

//       this.searchUsers = this.searchUsers.bind(this);

//     }


//     componentWillMount() {
//       //console.log('in friendlistitem before mount',this.props.profiles)

//     }

//     componentDidMount() {
//       //console.log('in friendlistitem after mount',this.props.profiles)

//     }

//     searchUsers(e) {
//       if (e.key === 'Enter') {
//         console.log(this.state.input);
//         this.props.searchFriend(this.props.user.id, this.state.input)
//         this.setState({
//           input: ''
//         })
//       } else if (e.key === 'Delete') {
//         this.setState({
//           input: this.state.input.slice(0, this.state.input.length - 2)
//         })
//       } else { 
//         this.setState({
//           input: this.state.input + e.key
//         })
//       } 
//     }

//     render () {
//       return (
//         <Input focus icon="users" iconPosition="left" placeholder="Search users..."  onKeyPress={this.searchUsers} value={this.state.input} /> 
//       );
//     }
// }