import React, { Component } from 'react'
import { List } from 'semantic-ui-react'
import DirectMessageItemContainer from '../containers/DirectMessageItemContainer';

class DirectMessageList extends Component {

  constructor (props) {
    super (props)
  }

  componentWillMount() {
  }

  render() {
    return (
      <List animated verticalAlign='middle'>
        {Object.keys(this.props.directs).map((friend, index) => {
          return <DirectMessageItemContainer friend={this.props.directs[friend].to_user_id} 
                                             key={index} 
                                             index={this.props.directs[friend].channel_id}
                 />
        })}
      </List>
    );
  }
}

export default DirectMessageList;