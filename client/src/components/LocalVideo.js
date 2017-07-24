import React, { Component } from 'react'
import { Button, Label, Segment} from 'semantic-ui-react'

class LocalVideo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      localVideo: [],
      mute: true,
      muteText: "Unmute"
    }

    this.toggleMute = this.toggleMute.bind(this)
  }

  toggleMute = function() {
    this.setState({
      mute: !this.state.mute
    })
    if (this.state.mute) {
      this.setState({
        muteText: 'Unmute'
      }) 
    } else {
      this.setState({
        muteText: 'Mute'
      })  
    }
  }
  componentDidMount() {
    document.getElementById('localVideoStream').srcObject = this.props.stream
  }

  render () {
    return (
      <div>
        <video autoPlay height="100" width="100" id='localVideoStream' muted={this.state.mute}>
<<<<<<< HEAD
        </video> 
        <br />
        <Button height='2' width='2' toggle active={this.state.mute} onClick={this.toggleMute} compact>
          {this.state.muteText}
        </Button>
=======
      </video> 
      <Button height='2' width='2' toggle active={this.state.mute} onClick={this.toggleMute} compact>
        {this.state.muteText}
      </Button>
>>>>>>> c0307b3152dfcd610ede47e238a00078a522e3c4
      </div>
    );
  }
} 

export default LocalVideo;