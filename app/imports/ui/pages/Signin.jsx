import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Form, Grid, Header, Message, Container, Segment } from 'semantic-ui-react';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Signin extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToOtp: false, otp: '', otp_input: '', redirectToRefer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange_login = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleChange_otp = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signin submission using Meteor's account mechanism. */
  submit_otp = () => {
    const { otp_input, otp } = this.state;
    if (otp_input === otp) {
      const { email, password } = this.state;
      Meteor.loginWithPassword(email, password, (err) => {
        if (err) {
          this.setState({ error: err.reason });
        } else {
          this.setState({ error: '', redirectToRefer: true });
        }
      });
    } else {
      this.setState({ error: 'Incorrect OTP' });
    }
  }

  submit_login = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: 'Username does not match password.' });
      } else {
        const random_otp = (`${Math.random()}`).substring(2, 8);
        this.setState({ error: '', redirectToOtp: true, otp: random_otp });
        Meteor.logout();
        const template_params = {
          to: this.state.email,
          otp: this.state.otp,
        };

        const service_id = 'service_m1f5auq';
        const template_id = 'template_dzv5jxm';
        const sendEmail = true;
        if (sendEmail) {
          // eslint-disable-next-line no-undef
          emailjs.send(service_id, template_id, template_params);
        } else {
          console.log(`otp = ${this.state.otp}`);
        }
      }
    });
  }

  /** Render the signin form. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/home' } };
    // if correct authentication, redirect to page instead of login screen
    // if (this.state.redirectToReferer) {
    //   return <Redirect to={from}/>;
    // }
    // Otherwise return the Login form.
    const loginPage = (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column stretched>
              <Header as={'h2'}>
                WELCOME TO BUDGET TRACKER
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                Login to your account
              </Header>
              <Form onSubmit={this.submit_login}>
                <Segment stacked>
                  <Form.Input
                      label="Email"
                      id="signin-form-email"
                      icon="user"
                      iconPosition="left"
                      name="email"
                      type="email"
                      placeholder="E-mail address"
                      onChange={this.handleChange_login}
                  />
                  <Form.Input
                      label="Password"
                      id="signin-form-password"
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.handleChange_login}
                  />
                  <Form.Button id="signin-form-submit" disabled={!this.state.email || !this.state.password} content="LOG IN"/>
                </Segment>
              </Form>
              <Message>
                New to BudgetTracker?&ensp;
                <Link to="/signup">Click here to Register</Link>
              </Message>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Login was not successful"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </Container>
    );

    const otpPage = (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                You should have recieved an email with OTP.
                Please enter that otp in the form below as it shows in the email.
              </Header>

              {/* this button will allow the email to be sent */}
              <Form.Button content="Send verification otp" /* onSubmit={this.sendEmail} *//>

              <Form onSubmit={this.submit_otp}>
                <Segment>
                  <Form.Input
                      label="Otp"
                      icon="lock"
                      iconPosition="left"
                      name="otp_input"
                      placeholder="Type OTP Here"
                      type="otp"
                      value={this.state.otp_input}
                      onChange={this.handleChange_otp}
                  />
                  <Form.Button content="Submit"/>
                </Segment>
              </Form>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="OTP was not correct"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </Container>
    );

    if (this.state.redirectToRefer) {
      return <Redirect to={from}/>;
    }

    if (this.state.redirectToOtp) {
      return otpPage;
    }
    return loginPage;
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signin.propTypes = {
  location: PropTypes.object,
};
