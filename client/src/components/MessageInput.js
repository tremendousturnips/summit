import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Form, Segment} from 'semantic-ui-react';

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
    const message = {
      username: this.props.user.display,
      text: this.state.text,
      timestamp: Date()
    };
    this.props.onSubmit(message);
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