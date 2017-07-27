import React from 'react';
import {Icon, Grid, Menu, Segment, Header, Container, Sidebar, List, Button} from 'semantic-ui-react';

import FriendListItemContainer from '../containers/FriendListItemContainer'

class FriendListMenu extends React.Component {
    constructor(props) {
        super(props)

        this.handleDone = this.handleDone.bind(this)
    }
    
    componentWillMount() {
      this.props.fetchFriends(this.props.user.id)
    }

    handleDone() {
      this.props.showFriendListStat();
    }

    render() {
        return (
        <Sidebar
          as={Menu}
          animation='overlay'
          width='thin'
          direction='right'
          visible={this.props.showFriendList}
          icon='labeled'
          vertical
        >
          <Menu.Item name='home'>
            <Icon name='group' />
            Friends
          </Menu.Item>
          <Menu.Item>
              <List animated verticalAlign='middle'>
                {this.props.friends.map((friend, index) => <FriendListItemContainer 
                                                            friend={friend}
                                                            delFriend={this.props.delFriend}
                                                            index={index} 
                                                            key={index}/>)}
              </List>                                              
          </Menu.Item>  
          <Menu.Item name='addFriend'>
            <Icon name='user plus' />
            Add Friend
          </Menu.Item>
          <Menu.Item>
            <Button onClick={this.handleDone}>
              Done
            </Button>
          </Menu.Item>  
        </Sidebar>  
        )
    }
}

export default FriendListMenu;