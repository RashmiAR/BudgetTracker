import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Income table. See pages/ListStuff.jsx. */
class IncomeItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.income.name}</Table.Cell>
          <Table.Cell>${this.props.income.amount}</Table.Cell>
          <Table.Cell>
            <Link to={`/editincome/${this.props.income._id}`}>Edit</Link>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
IncomeItem.propTypes = {
  income: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(IncomeItem);
