import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

class EmailOtp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pin: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup.
   * Users should be given an OTP each time they Sign-in
   * Redirect the user to home page if username and password are entered correctly. */
  submit = () => {
    const { email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }

    return (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center">
                You should have recieved an email with an OneTimePassword.
                Please enter that OneTimePassword in the form below as exactly as it shows in the email.
              </Header>
              <Form onSubmit={this.submit}>
                <Segment>
                  <Form.Input
                      label="Otp"
                      icon="lock"
                      iconPosition="left"
                      name="otp"
                      placeholder="Type Pin Here"
                      type="otp"
                      onChange={this.handleChange}
                  />
                  <Form.Button content="Submit"/>
                </Segment>
              </Form>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="OTP is incorrect"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
EmailOtp.propTypes = {
  location: PropTypes.object,
};

export default EmailOtp;
