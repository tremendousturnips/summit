import React, {Component} from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'

class AddChannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      channelName: ''
    }
  }

  show = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  handleSubmit = (e) => {
    console.log(this.state.channelName);
    this.props.addChannel();
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      channelName: e.target.value
    });
  }
  render() {
    const { open } = this.state

    return (
      <div>
        <Button onClick={this.show} size='mini'>Add Channel</Button>

        <Modal size='mini' open={open} onClose={this.close} closeIcon='close' >
          <Modal.Header>
            Create Text Channel
          </Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Form.Input placeholder='Channel name' label='Channel Name' onChange={this.handleChange}/>
              </Form.Field>
              <Button positive icon='checkmark' labelPosition='right' content='Create' />
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default AddChannel;