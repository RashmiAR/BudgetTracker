import React from 'react';
import { Grid, Container, Table, Header, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Incomes } from '../../api/income/Income';
import { Expenses } from '../../api/expense/Expense';

/** A simple static component to render some text for the landing page. */
class Home extends React.Component {

  getIncomeAmount() {
    let amount = 0;
    // eslint-disable-next-line no-return-assign
    this.props.incomes.map((income) => amount += income.amount);
    return Math.round(amount * 100) / 100;
  }

  getExpenseAmount() {
    let amount = 0;
    // eslint-disable-next-line no-return-assign
    this.props.expenses.map((expense) => amount += expense.amount);
    return Math.round(amount * 100) / 100;
  }

  makeTable(data) {
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((d) => <React.Fragment key={d._id}>
              <Table.Row>
                <Table.Cell>{d.name}</Table.Cell>
                <Table.Cell>${d.amount}</Table.Cell>
              </Table.Row>
            </React.Fragment>)
          }
        </Table.Body>
      </Table>);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h1" textAlign="center">Budget Overview</Header>
          <Header as="h2" textAlign="center">Balance ${Math.round((this.getIncomeAmount() - this.getExpenseAmount()) * 100) / 100}</Header>
          <Grid id='landing-page' textAlign='center' container>
            <Grid.Column width={6}>
              <Container>
                <Header as="h2" textAlign="center">Total Income ${this.getIncomeAmount()}</Header>
                {this.makeTable(this.props.incomes)}
              </Container>
            </Grid.Column>

            <Grid.Column width={6}>
              <Container>
                <Header as="h2" textAlign="center">Total Expenses ${this.getExpenseAmount()}</Header>
                {this.makeTable(this.props.expenses)}
              </Container>
            </Grid.Column>

          </Grid>
        </Container>
    );
  }
}

/** Require an array of Income and Expense documents in the props. */
Home.propTypes = {
  incomes: PropTypes.array.isRequired,
  expenses: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Income documents.
  const incomeSubscription = Meteor.subscribe(Incomes.userPublicationName);
  // Get access to Expense documents.
  const expenseSubscription = Meteor.subscribe(Expenses.userPublicationName);
  return {
    incomes: Incomes.collection.find({}).fetch(),
    expenses: Expenses.collection.find({}).fetch(),
    ready: incomeSubscription.ready() && expenseSubscription.ready(),
  };
})(Home);
