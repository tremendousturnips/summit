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

    }

    componentWillMount() {
      //console.log('in Direct Message Item before mount', this.props.channels[this.props.index]) 
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
      return null;
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
<<<<<<< HEAD
              {/* <Label size='mini' color='red' floating>{this.getMessageDiff()}</Label> */}
=======
              <Label size='mini' color='red' floating>{this.getMessageDiff()}</Label>
>>>>>>> search friends
              </a>
            </List.Header>  
          </List.Content>
        </List.Item>
      );
    }
};

export default DirectMessageItem;