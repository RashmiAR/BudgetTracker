import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' container rows={3}>

          <Grid.Row>
            <Image size='massive' circular src="/images/BudgetTrackerLogo.png"/>
          </Grid.Row>

          <Grid.Row>
            <Header as='h1'>Best Budget Tracker 1.0</Header>
          </Grid.Row>

          <Grid.Row>
            <Header as='h2'>Manage your finances today by signing up!</Header>
          </Grid.Row>

        </Grid>
    );
  }
}

export default Landing;
