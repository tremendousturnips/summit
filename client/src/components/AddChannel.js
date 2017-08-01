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
    e.preventDefault();
    this.props.postChannel({name: this.state.channelName});
    this.setState({
      channelName: '',
      open: false
    });
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

        <Modal size='small' open={open} onClose={this.close} closeIcon='close' dimmer='blurring'>
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