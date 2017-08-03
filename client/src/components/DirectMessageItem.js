import React, { Component } from 'react'
import { Menu, Image, List, Label } from 'semantic-ui-react';

class DirectMessageItem extends Component {
    constructor(props) {
      super (props)

      if (!this.props.profiles[this.props.friend]) {
        this.props.getProfile(this.props.friend)
      }

      this.sendMessage = this.sendMessage.bind(this)
      this.getMessageDiff = this.getMessageDiff.bind(this)
      this.loadProfile = this.loadProfile.bind(this);

    }

    componentWillMount() {
     // console.log('in Direct Message Item before mount', this.props.profiles, this.props.friend) 
    }

    componentDidMount() {

    }

    getMessageDiff() {
      if (Object.keys(this.props.channels).length > 0) {
        if (Object.keys(this.props.messages).length > 0) {
          console.log(this.props.messages[0].created_at)
          return this.props.channels[this.props.index].timeStamp
        }
      } 
      return
    }

    sendMessage () {
      console.log('channels, channel_id', this.props.channels, this.props.index)
      this.props.selectChannel(this.props.channels[this.props.index])
    }

    loadProfile() {
      if (this.props.profiles[this.props.friend]) {
        return <List.Item>
            <Image avatar src={this.props.profiles[this.props.friend].image} alt='p' />
            <List.Content>
              <List.Header> 
                <a onClick={this.sendMessage}>{this.props.profiles[this.props.friend].display}  
                {/* <Label size='mini' color='red' floating>{this.getMessageDiff()}</Label> */}
                </a>
              </List.Header>  
            </List.Content>
          </List.Item>
      } else {
        return null
      }
    }

    render () {
      return (
        this.loadProfile()
      );
    }
};

export default DirectMessageItem;