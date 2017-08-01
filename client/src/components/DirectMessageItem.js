import React, { Component } from 'react'
import { Menu, Image, List } from 'semantic-ui-react';

class DirectMessageItem extends Component {
    constructor(props) {
      super (props)

      if (!this.props.profiles[this.props.friend]) {
        this.props.getProfile(this.props.friend)
      }

      this.sendMessage = this.sendMessage.bind(this)

    }

    componentWillMount() {
      //console.log('in Direct Message Item before mount', this.props.channels) 

    }

    componentDidMount() {
    }

    sendMessage () {
      this.props.selectChannel(this.props.channels[this.props.index])
    }

    render () {
      return (
        <List.Item>
          <Image avatar src={this.props.profiles[this.props.friend].image} alt='p' />
          <List.Content>
             <List.Header> 
              <a onClick={this.sendMessage}>{this.props.profiles[this.props.friend].display}
              </a>
            </List.Header>  
          </List.Content>
        </List.Item>
      );
    }
};

export default DirectMessageItem;