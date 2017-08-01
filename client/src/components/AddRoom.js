import React, {Component} from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'

class AddRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      roomName: '',
      description: ''
    }
  }

  show = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.postRoom({name: this.state.roomName, description: this.state.description});
    this.setState({
      roomName: '',
      description: '',
      open: false
    });
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    const { open } = this.state;

    return (
      <div>
        <Button onClick={this.show} size='mini'>Create Room</Button>

        <Modal size='small' open={open} onClose={this.close} closeIcon='close' dimmer='blurring'>
          <Modal.Header>
            Create a New Room
          </Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Form.Input name='roomName' placeholder='Room name' label='Room Name' onChange={this.handleChange}/>
              </Form.Field>
              <Form.Field>
                <Form.Input name='description' placeholder='Description' label='Description' onChange={this.handleChange}/>
              </Form.Field>
              <Button positive icon='checkmark' labelPosition='right' content='Create' />
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default AddRoom;