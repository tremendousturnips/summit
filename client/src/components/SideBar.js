import React from 'react';
import { Segment, Label, List, Image, Grid, Icon} from 'semantic-ui-react';

const SideBar = () => (
  <Segment attached='top' inverted >
    <Label color='black' attached='top' size='massive'>Friends</Label>
    <List animated inverted divided verticalAlign='middle'>
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
    <Grid columns={2} relaxed>
      <Grid.Column>
        <Icon inverted fitted bordered  size='big' name='add user' link/>
      </Grid.Column>
      <Grid.Column>
        <Icon inverted fitted bordered size='big' name='remove user' link />
      </Grid.Column>
    </Grid>
  </Segment>
)

export default SideBar;