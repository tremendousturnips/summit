import React from 'react';
import { Segment, Label, List, Image, Grid, Icon} from 'semantic-ui-react';

const SideBar = () => (
  <Grid.Column width={4}>
  <Segment attached='top' inverted id='sidebartop'>
    <List animated inverted divided verticalAlign='middle'>
        <List.Item>
          <Icon size='big' name='users' />
          <List.Content>
            <List.Header>
              <Label color='black' attached='top' size='huge'>Friends</Label>
            </List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <Image avatar src='' />
          <List.Content>
            <List.Header>User 1</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <Image avatar src='' />
          <List.Content>
            <List.Header>User 2</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <Image avatar src='' />
          <List.Content>
            <List.Header>User 3</List.Header>
          </List.Content>
        </List.Item>
    </List>
  </Segment>
  <Segment attached='bottom' inverted id='sidebarbottom'>
    <Grid columns={2} centered relaxed>
      <Grid.Column>
        <Icon color='green' fitted size='big' name='add user' link/>
      </Grid.Column>
      <Grid.Column>
        <Icon color='red' fitted size='big' name='remove user' link />
      </Grid.Column>
    </Grid>
  </Segment>
  </Grid.Column>
)

export default SideBar;