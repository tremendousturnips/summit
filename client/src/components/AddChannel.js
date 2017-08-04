import React, {Component} from 'react';
import { Button, Modal, Form, Message } from 'semantic-ui-react'

class AddChannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channelName: '',
      error: ''
    }
  }

  // show = () => this.setState({ open: true });
  // close = () => this.setState({ open: false });

  handleSubmit = (e) => {
    e.preventDefault();
    const {postChannel} = this.props;
    let {channelName, error} = this.state;
    channelName = channelName.trim();
    if (channelName.length) {
      this.props.postChannel({name: channelName});
      this.setState({
        channelName: '',
        error: '',
      },this.props.close);
    } else {
      this.setState({
        error: 'You must provide a channel name.'
      })
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      channelName: e.target.value
    });
  }

  render() {
    const { error } = this.state;

        // {/* <Button onClick={this.show} size='mini'>Add Channel</Button> */}
    return (

        <Modal size='small' open={this.props.open} onClose={this.props.close} closeIcon='close' dimmer='blurring'>
          <Modal.Header>
            Create Text Channel
          </Modal.Header>
          {error.length ?
          <Modal.Description>
            <Message negative content={error}/>
          </Modal.Description> :
          <div></div>}
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Form.Input placeholder='Channel name' label='Channel Name' onChange={this.handleChange}/>
              </Form.Field>
              <Button positive icon='checkmark' labelPosition='right' content='Create' />
            </Form>
          </Modal.Content>
        </Modal>
    )
  }
}

export default AddChannel;