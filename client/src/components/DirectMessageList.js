import React, { Component } from 'react'
import { List } from 'semantic-ui-react'
import DirectMessageItemContainer from '../containers/DirectMessageItemContainer';

const DirectMessageList = (props) => (
  <List animated verticalAlign='middle'>
    {Object.keys(props.directs).map((friend, index) => {
      return <DirectMessageItemContainer friend={props.directs[friend].to_user_id} key={index} index={props.directs[friend].channel_id}/>
    })}
  </List>
);

export default DirectMessageList;