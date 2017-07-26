import React, {Component} from 'react';
import { Button, Modal, Form } from 'semantic-ui-react'

class AddChannel extends Component {
  state = { open: false }

  show = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state

    return (
      <div>
        <Button onClick={this.show} size='mini'>Add Channel</Button>

        <Modal size='mini' open={open} onClose={this.close} closeIcon='close'>
          <Modal.Header>
            Create Text Channel
          </Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <Form.Input placeholder='Channel name' label='Channel Name'/>
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button positive icon='checkmark' labelPosition='right' content='Create' />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default AddChannel;