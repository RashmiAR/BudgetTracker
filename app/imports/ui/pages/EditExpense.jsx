import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Expenses } from '../../api/expense/Expense';

const bridge = new SimpleSchema2Bridge(Expenses.schema);

/** Renders the Page for editing a single document. */
class EditExpense extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, amount, _id } = data;
    Expenses.collection.update(_id, { $set: { name, amount } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Expense Item</Header>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <TextField name='name'/>
                <NumField name='amount'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='userEmail' />
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of an Expense document in the props object. Uniforms adds 'model' to the props, which we use. */
EditExpense.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Expense documents.
  const subscription = Meteor.subscribe(Expenses.userPublicationName);
  return {
    doc: Expenses.collection.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditExpense);
