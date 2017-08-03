import React, { Component } from 'react'
import { Input, Label, Modal, Search } from 'semantic-ui-react'

class AddFriendSearch extends Component {
    constructor(props) {
      super (props)

      this.state = {
        input: ''
      }

      this.searchUsers = this.searchUsers.bind(this);

    }


    componentWillMount() {
      //console.log('in friendlistitem before mount',this.props.profiles)

    }

    componentDidMount() {
      //console.log('in friendlistitem after mount',this.props.profiles)

    }

    searchUsers(e) {
      if (e.key === 'Enter') {
        console.log(this.state.input);
        this.props.searchFriend(this.props.user.id, this.state.input)
        this.setState({
          input: ''
        })
      } else if (e.key === 'Delete') {
        this.setState({
          input: this.state.input.slice(0, this.state.input.length - 2)
        })
      } else { 
        this.setState({
          input: this.state.input + e.key
        })
      } 
    }

    render () {
      return (
        <Input focus icon="users" iconPosition="left" placeholder="Search users..."  onKeyPress={this.searchUsers} value={this.state.input} /> 
      );
    }
}

export default AddFriendSearch;