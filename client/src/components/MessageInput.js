import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Form, Segment} from 'semantic-ui-react';
import axios from 'axios';

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let message = {
      user_id: this.props.user.id,
      text: this.state.text.trim(),
      channel_id: this.props.currentChannel.id
    };
    if (message.text.length) {
      this.props.postMessage(message);
    }
    this.setState({
      text: ''
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({text: e.target.value})
  }
  
  render() {
    const {currentChannel} = this.props;
    return (
      <Form onSubmit={this.handleSubmit} >
        <Form.Input fluid action={{ icon: 'send' }} size='medium' placeholder='Enter Message...' value={this.state.text} onChange={this.handleChange} disabled={!currentChannel.id}/>
      </Form>
    )
  }
}

export default MessageInput;