import React from 'react';
import { Grid, Icon, Header } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '50px', paddingBottom: '20px' };
    return (
      <Grid style={divStyle} stackable centered container>
        <Grid.Row>
          <a href={'https://github.com/RashmiAR/BudgetTracker'}>
            <Icon size={'large'} name={'github'}/>
          </a>
        </Grid.Row>
        <Grid.Row>
          <Header as={'h4'}>
            &copy; 2020 BudgetTracker Inc. All rights reserved.
          </Header>
        </Grid.Row>
        <Grid.Row>
          <a href={'/#/about'}>About Us</a>
          <p>&ensp;|&ensp;</p>
          <a href={'/#/terms'}>Terms and Conditions</a>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Footer;
