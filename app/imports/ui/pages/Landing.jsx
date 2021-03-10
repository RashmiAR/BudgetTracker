import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={8}>
            <Image size='huge' circular src="/images/BudgetTrackerLogo.png"/>
          </Grid.Column>

          <Grid.Column width={8}>
            <h1>Best Budget Tracker</h1>
            <p>Sign in or sign up</p>
          </Grid.Column>

        </Grid>
    );
  }
}

export default Landing;
