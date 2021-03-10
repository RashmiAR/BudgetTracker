import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Incomes } from '../../api/income/Income';
import IncomeItem from '../components/IncomeItem';

/** Renders a table containing all of the Income documents. Use <IncomeItem> to render each row. */
class Income extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Income</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.incomes.map((income) => <IncomeItem key={income._id} income={income} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Income documents in the props. */
Income.propTypes = {
  incomes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Income documents.
  const subscription = Meteor.subscribe(Incomes.userPublicationName);
  return {
    incomes: Incomes.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Income);
