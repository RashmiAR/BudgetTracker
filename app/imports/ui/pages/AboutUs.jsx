import React from 'react';
import { Container, Header, Image, Segment, Grid } from 'semantic-ui-react';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class AboutUs extends React.Component {
  render() {
    return (
        <div>
          <Container style={{ paddingTop: '65px', paddingBottom: '130px' }}>
            <Header as={'h3'}>
              BudgetTracker provides a web portal to manage your budget with the best security for our application.
              We are committed to protect sensitive personal information and helping users to manage their income in a easier and secure way.
            </Header>
            <Segment
                inverted
                style={{ paddingTop: '50px', paddingBottom: '50px', marginTop: '70px' }}>
              <Grid textAlign={'center'} columns={'equal'}>
                <Grid.Column>
                  <Image centered style={{ width: '150px' }} circular src={'/images/brody.jpg'}/>
                  <Header inverted as={'h4'}>Brody Uehera</Header>
                </Grid.Column>
                <Grid.Column>
                  <Image centered style={{ width: '150px' }} circular src={'/images/joshua.png'}/>
                  <Header inverted as={'h4'}>Joshua Hartmann</Header>
                </Grid.Column>
                <Grid.Column>
                  <Image centered style={{ width: '150px' }} circular src={'/images/irene.png'}/>
                  <Header inverted as={'h4'}>Irene Ma</Header>
                </Grid.Column>
                <Grid.Column>
                  <Image centered style={{ width: '150px' }} circular src={'/images/Rashmi.png'}/>
                  <Header inverted as={'h4'}>Rashmi Arvety Ramanatha</Header>
                </Grid.Column>
              </Grid>
            </Segment>
          </Container>
        </div>
    );
  }
}

export default AboutUs;
