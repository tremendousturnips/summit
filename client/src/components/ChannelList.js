import React, { Component } from 'react'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header, Label} from 'semantic-ui-react'
import AddChannel from './AddChannel';

const ChannelList = ({ channels, selectChannel, currentChannel, postChannel }) => (
    <Menu vertical text pointing secondary>
      <AddChannel postChannel={postChannel}/>
      {channels.map((channel, index) => (
        <Menu.Item active={currentChannel.id == channel.id} key={channel.id} onClick={()=>{selectChannel(channel)}}>{channel.name}</Menu.Item>)
      )}
    </Menu>
);

export default ChannelList;
