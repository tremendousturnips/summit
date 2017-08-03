import React from 'react';
import { Icon, Menu, Sidebar, List, Button, Modal, Input, Label } from 'semantic-ui-react';

import FriendListItemContainer from '../containers/FriendListItemContainer';
import AddFriendItemContainer from '../containers/AddFriendItemContainer';
import AddFriendSearchContainer from '../containers/AddFriendSearchContainer';

class FriendListMenu extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
          showModal: false
        }

        this.handleDone = this.handleDone.bind(this)
        this.handleAddFriend = this.handleAddFriend.bind(this)
        this.toggleShowModal = this.toggleShowModal.bind(this)
    }
    
    componentWillMount() {
      this.props.fetchFriends(this.props.user.id)
      this.props.socket.on('friend update', friend => {
        if (this.props.user.id === parseInt(friend.friend_id)) {
          switch(friend.status) {
            case 'Accepted':
              this.props.updateFriend(friend.friend_id, friend.user_id, friend.status)
              break;
            case 'Denied':
              this.props.updateFriend(friend.friend_id, friend.user_id, 'Blocked')
              break;
            case 'Pending':
              this.props.updateFriend(friend.friend_id, friend.user_id, friend.status)
              break;
            case 'Removed':
              this.props.updateFriend(friend.friend_id, friend.user_id, friend.status)
              break;  
            default:
              break;  
          }
        };
      });
      this.props.socket.on('Start direct message', (direct) => {
        if (this.props.user.id === parseInt(direct.to_user_id)) {
          let d = {
            user_id: parseInt(direct.to_user_id),
            to_user_id : direct.user_id,
            id: direct.id || '',
            channel_id: direct.channel_id
          }
          this.props.addDirect(d)
          var c = {
            id: direct.channel_id,
            name: '',
            room_id: 0
          }
          this.props.addChannel(c, 0)
          this.props.subscribeChannel(direct.channel_id, this.props.socket);
          this.props.setMessages([], direct.channel_id);
        }
      });
    }

    toggleShowModal() {
      this.setState({
        showModal: !this.state.showModal
      })
    }

    handleDone() {
      this.props.showFriendListStat();
    }

    handleAddFriend() {
      this.toggleShowModal()
    }

    componentDidMount() {
    }

    render() {
        return (  
        <Sidebar
          as={Menu}
          animation='overlay'
          width='wide'
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
              <List relaxed='very' verticalAlign='top'>
                {Object.keys(this.props.friends).map((objectKey) => { 
                                                          return <FriendListItemContainer 
                                                            friend={this.props.friends[objectKey]}
                                                            index={objectKey} 
                                                            key={objectKey}/>})}
              </List>                                              
          </Menu.Item> 
          <Menu.Item name='addFriend'>
            <Button.Group labeled >
              <Button compact icon='add user' color='red' content='Add' onClick={this.handleAddFriend} inverted/>
              <Button compact icon='checkmark' color='green' content='Done' onClick={this.handleDone} inverted />
            </Button.Group>
          </Menu.Item> 
          <Modal
            open={this.state.showModal}
            onClose={this.handleCloseModal}
            size='small' 
          >
            <Modal.Header>
              <AddFriendSearchContainer  />
              <Label corner='right' icon='window close' color='red' onClick={this.toggleShowModal} />
            </Modal.Header>       
            <Modal.Content scrolling>
              <List animated verticalAlign='middle'>
                {Object.keys(this.props.profiles)
                  .filter((objectKey) => {
                    let r = true
                    if (parseInt(objectKey)  === this.props.user.id) {
                      r = false 
                    } else {
                      for (var key in this.props.friends) {
                        if (objectKey === key) {
                          r = false
                        }
                      }
                    }
                    return r;
                  })
                .map((objectKey, index) => {
                  return <AddFriendItemContainer index={objectKey} key={index} />;
                })}
            </List>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" onClick={this.toggleShowModal} inverted>
              <Icon name="checkmark" /> Done
            </Button>
          </Modal.Actions>
        </Modal>
      </Sidebar>
    );
  }
}

export default FriendListMenu;
// import React from 'react';
// import { Icon, Menu, Sidebar, List, Button, Modal, Input, Label } from 'semantic-ui-react';

// import FriendListItemContainer from '../containers/FriendListItemContainer';
// import AddFriendItemContainer from '../containers/AddFriendItemContainer';

// class FriendListMenu extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       showModal: false
//     };

//     this.handleDone = this.handleDone.bind(this);
//     this.handleModalClose = this.handleModalClose.bind(this);
//     this.toggleShowModal = this.toggleShowModal.bind(this);
//   }

//   componentWillMount() {
//     this.props.fetchFriends(this.props.user.id);
//   }

//   toggleShowModal() {
//     this.setState({
//       showModal: !this.state.showModal
//     });
//   }

//   handleDone() {
//     this.props.showFriendListStat();
//   }

//   handleModalClose() {
//     this.toggleShowModal();
//   }

//   componentDidMount() {}

//   render() {
//     const { open, showModal } = this.state;
//     const { friends, profiles, user } = this.props;
//     return (
//       <Modal
//         size="small"
//         open={open}
//         onClose={this.handleModalClose()}
//         closeIcon="close"
//         dimmer="blurring"
//       >
//         <Menu.Item name="home">
//           <Icon name="group" />
//           Friends
//         </Menu.Item>
//         <Menu.Item>
//           <List relaxed="very" verticalAlign="top">
//             {Object.keys(friends).map(objectKey => {
//               return (
//                 <FriendListItemContainer
//                   friend={friends[objectKey]}
//                   index={objectKey}
//                   key={objectKey}
//                 />
//               );
//             })}
//           </List>
//         </Menu.Item>
//         <Menu.Item name="addFriend">
//           <Button.Group labeled>
//             <Button
//               compact
//               icon="add user"
//               color="red"
//               content="Add"
//               onClick={this.toggleShowModal}
//               inverted
//             />
//             <Button
//               compact
//               icon="checkmark"
//               color="green"
//               content="Done"
//               onClick={this.handleDone}
//               inverted
//             />
//           </Button.Group>
//         </Menu.Item>
//         <Modal open={showModal} onClose={this.handleCloseModal} size="small">
//           <Modal.Header>
//             <Input
//               focus
//               icon="users"
//               iconPosition="left"
//               placeholder="Search users..."
//               action="Search"
//             />
//             <Label corner="right" icon="window close" color="red" onClick={this.toggleShowModal} />
//           </Modal.Header>
//           <Modal.Content scrolling>
//             <List animated verticalAlign="middle">
//               {Object.keys(profiles)
//                 .filter(objectKey => {
//                   let r = true;
//                   if (parseInt(objectKey) === user.id) {
//                     r = false;
//                   } else {
//                     for (var key in friends) {
//                       if (objectKey === key) {
//                         r = false;
//                       }
//                     }
//                   }
//                   return r;
//                 })
//                 .map((objectKey, index) => {
//                   return <AddFriendItemContainer index={objectKey} key={index} />;
//                 })}
//             </List>
//           </Modal.Content>
//           <Modal.Actions>
//             <Button color="green" onClick={this.toggleShowModal} inverted>
//               <Icon name="checkmark" /> Done
//             </Button>
//           </Modal.Actions>
//         </Modal>
//       </Modal>
//     );
//   }
// }

// export default FriendListMenu;
