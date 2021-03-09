import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Incomes } from '../../api/income/Income.js';
import { Expenses } from '../../api/expense/Expense.js';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.userEmail})`);
  Stuffs.collection.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** Initialize the database with a default data document. */
function addIncome(data) {
  console.log(`  Adding: ${data.name} (${data.userEmail})`);
  Incomes.collection.insert(data);
}

/** Initialize the Income collection if empty. */
if (Incomes.collection.find().count() === 0) {
  if (Meteor.settings.defaultIncome) {
    console.log('Creating default income data.');
    Meteor.settings.defaultIncome.map(data => addIncome(data));
  }
}

/** Initialize the database with a default data document. */
function addExpense(data) {
  console.log(`  Adding: ${data.name} (${data.userEmail})`);
  Expenses.collection.insert(data);
}

/** Initialize the Expense collection if empty. */
if (Expenses.collection.find().count() === 0) {
  if (Meteor.settings.defaultExpense) {
    console.log('Creating default expense data.');
    Meteor.settings.defaultExpense.map(data => addExpense(data));
  }
}
