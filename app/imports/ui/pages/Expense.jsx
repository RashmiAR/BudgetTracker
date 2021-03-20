import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Expenses } from '../../api/expense/Expense';
import ExpenseItem from '../components/ExpenseItem';

/** Renders a table containing all of the Expense documents. Use <ExpenseItem> to render each row. */
class Expense extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Expense</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.expenses.map((expense) => <ExpenseItem key={expense._id} expense={expense} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Expense documents in the props. */
Expense.propTypes = {
  expenses: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Expense documents.
  const subscription = Meteor.subscribe(Expenses.userPublicationName);
  return {
    expenses: Expenses.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Expense);
