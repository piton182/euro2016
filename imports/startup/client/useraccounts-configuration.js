import { AccountsTemplates } from 'meteor/useraccounts:core';

AccountsTemplates.configure({
  forbidClientAccountCreation: true,
});
