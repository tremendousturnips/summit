import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Label} from 'semantic-ui-react'
import AddChannel from './AddChannel';

const ChannelList = ({ channels, currentChannel, currentRoom, channelsByRoom, selectChannel, postChannel }) => (
    <Menu vertical text pointing secondary>
      {currentRoom.id ? <AddChannel postChannel={postChannel}/> : <br />}
      {channelsByRoom[currentRoom.id].map((channelId) => (
        <Menu.Item active={currentChannel.id === channelId} key={channelId} onClick={()=>{selectChannel(channels[channelId])}}>{channels[channelId].name}</Menu.Item>)
      )}
    </Menu>
);

export default ChannelList;
