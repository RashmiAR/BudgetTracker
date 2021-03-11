import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class StuffItemAdmin extends React.Component {
  removeItem(docID) {
    console.log(`item to delete is: ${docID}`);
    Stuffs.collection.remove(docID);
  }

  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.stuff.name}</Table.Cell>
          <Table.Cell>{this.props.stuff.userEmail}</Table.Cell>
          <Table.Cell><Button icon onClick={() => this.removeItem(this.props.stuff._id)} className="button-color">
            <Icon name='trash'/></Button>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
StuffItemAdmin.propTypes = {
  stuff: PropTypes.object.isRequired,
  Stuffs: PropTypes.object.isRequired,
};

export default StuffItemAdmin;
