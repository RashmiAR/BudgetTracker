import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment, Popup } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', confirmpassword: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { email, password, confirmpassword } = this.state;
    if (!this.validPassword(password, confirmpassword)) {
      return;
    }
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /**
   * Password Requirements:
   - Must be within 8 - 32 characters
   - Must have at least one upper case character
   - Must have at least one lower case character
   - Must have at least one numeric character
   - Must have at least one special character
   - New password must match Confirm Password
   - New password cannot be same as the old password
   * @param password
   * @param confirm
   * @returns {boolean}
   */
  validPassword(password, confirmpassword) {
    if (password !== confirmpassword) {
      this.setState({ error: 'Passwords do not match' });
      return false;
    }
    if (password.length < 8) {
      this.setState({ error: 'Password is too short. Required atleast 8 characters.' });
      return false;
    }
    if (password.length > 32) {
      this.setState({ error: 'Password is too long. Maximum limit is 32 characters' });
      return false;
    }

    let hasSpecial = false;
    let hasInvalid = false;
    let hasNumeric = false;
    let hasUpperCase = false;
    let hasLowerCase = false;

    for (let i = 0; i < password.length; i++) {
      const code = password.charCodeAt(i);
      if (code >= 97 && code <= 122) {
        hasLowerCase = true;
      } else if (code >= 65 && code <= 90) {
        hasUpperCase = true;
      } else if (code >= 48 && code <= 57) {
        hasNumeric = true;
      } else if (code >= 33 && code <= 126) {
        hasSpecial = true;
      } else {
        hasInvalid = true;
        break;
      }
    }

    if (hasInvalid) {
      this.setState({ error: 'Password contains an invalid character.' });
      return false;
    }

    if (hasSpecial && hasUpperCase && hasLowerCase && hasNumeric && !hasInvalid) {
      return true;
    }

    const err_msg = [];
    if (!hasSpecial) {
      err_msg.push('Include a special character. Examples: ! @ # % ^ & * ( )');
    }
    if (!hasUpperCase) {
      err_msg.push('Password must contain an upper case character.');
    }
    if (!hasLowerCase) {
      err_msg.push('Password must contain a lower case character.\n');
    }
    if (!hasNumeric) {
      err_msg.push('Password must contain a numeric character.\n');
    }

    this.setState({ error: err_msg, password: '', confirmpassword: '' });
    return false;
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/home' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    const passwordRequirements =
        <ul>
          <li>Must be 8 - 32 characters long</li>
          <li>At least 1 upper case character</li>
          <li>At least 1 lower case character</li>
          <li>At least 1 numeric character</li>
          <li>At least 1 special character</li>
          <li>New password correctly entered twice</li>
        </ul>;
    return (
      <Container id="signup-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Register your account
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Email"
                  id="signup-form-email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Grid columns={2} stackable textAlign='left'>
                  <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                      <Popup
                          header='Password Requirements:'
                          hoverable
                          content={passwordRequirements}
                          position='bottom left'
                          flowing
                          trigger={<Form.Input
                              label="Password"
                              icon="lock"
                              iconPosition="left"
                              name="password"
                              placeholder="Password"
                              type="password"
                              value={this.state.password}
                              onChange={this.handleChange}
                          />}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Form.Input
                          label=""
                          icon=""
                          iconPosition="left"
                          name="confirmpassword"
                          placeholder="Confirm Password"
                          type="password"
                          onChange={this.handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Form.Button id="signup-form-submit" content="SIGN UP"/>
              </Segment>
            </Form>
            <Message>
              Already have an account? <Link to="/signin">LOGIN</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message error>
                <Message.Header>Registration was not successful</Message.Header>
                <p>
                  Your password is missing one or more of the following parameters:
                </p>
                <Message.List items={this.state.error}/>
              </Message>
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
