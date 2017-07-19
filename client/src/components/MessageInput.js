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
      userId: this.props.user.id,
      text: this.state.text,
      channelId: 1
    };
    axios.post('/api/messages/', message)
      .then(res => {
        console.log(res);
        this.props.socket.emit('send', message);
        this.setState({
          text: ''
        })
      })
      .catch(err=>{
        console.log(err);
      })
    
    // this.props.onSubmit(message);
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({text: e.target.value})
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input fluid action={{ icon: 'send' }} size='medium' placeholder='Enter Message...' value={this.state.text} onChange={this.handleChange}/>
      </Form>
    )
  }
}

export default MessageInput;