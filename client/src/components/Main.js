import React, { Component } from 'react';
import {Grid, Sidebar} from 'semantic-ui-react';

import NavBarContainer from '../containers/NavBarContainer';
import MessageContainer from '../containers/MessageContainer';
import InputContainer from '../containers/InputContainer';
import LeftMenuContainer from '../containers/LeftMenuContainer';
import VideoChatBarContainer from '../containers/VideoChatBarContainer';
import FriendListContainer from '../containers/FriendListContainer';

<<<<<<< HEAD
const Main = () => (
    <Sidebar.Pushable>
      <Sidebar.Pusher>
        <Grid>
          <Grid.Column width={3}>
              <LeftMenuContainer/>
          </Grid.Column>
          <Grid.Column width={12} >
            <Grid.Row>
              <NavBar />
              <VideoChatBarContainer />
            </Grid.Row>
            <Grid.Row>
              <MessageContainer />
            </Grid.Row>
            <Grid.Row>
              <InputContainer />
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Sidebar.Pusher>
      <FriendListContainer />
    </Sidebar.Pushable>
);
=======
class Main extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Sidebar.Pushable>
        <Sidebar.Pusher>
          <Grid>
            <Grid.Column width={3}>
                <LeftMenuContainer/>
            </Grid.Column>
            <Grid.Column width={12} >
              <Grid.Row>
                <NavBarContainer/>
                <VideoChatBarContainer />
              </Grid.Row>
              <Grid.Row>
                <MessageContainer />
              </Grid.Row>
              <Grid.Row>
                <InputContainer />
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Sidebar.Pusher>
        <FriendListContainer />
      </Sidebar.Pushable>
    );
  }
}
// const Main = () => (
//     <Sidebar.Pushable>
//       {/* <LeftMenu/> */}
//       <Sidebar.Pusher>
//         <Grid>
//           <Grid.Column width={2}>
//               <LeftMenuContainer/>
//           </Grid.Column>
//           <Grid.Column>
//           </Grid.Column>
//           <Grid.Column width={10} >
//             <Grid.Row>
//               <NavBar />
//             </Grid.Row>
//             <Grid.Row>
//               <MessageContainer />
//             </Grid.Row>
//             <Grid.Row>
//               <InputContainer />
//             </Grid.Row>
//           </Grid.Column>
//           <Grid.Column>
//             <VideoChatBarContainer />
//           </Grid.Column>
//         </Grid>
//       </Sidebar.Pusher>
//     </Sidebar.Pushable>
// );
>>>>>>> hook up rooms actions/reducers to leftmenucontainer

export default Main;
