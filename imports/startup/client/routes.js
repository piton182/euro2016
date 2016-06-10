import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import to load these templates
import '../../ui/layouts/app-body.js';
import '../../ui/components/leaderboard.js';
import '../../ui/components/matches.js';

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_leaderboard'});
  },
});

FlowRouter.route('/matches', {
  name: 'App.matches',
  action() {
    BlazeLayout.render('App_body', { main: 'App_matches'});
  },
});
