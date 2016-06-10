import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Leaderboards } from '../../api/leaderboards.js';

import './leaderboard.html';

Template.App_leaderboard.helpers({
  users() {
    const leaderboardDoc = Leaderboards.findOne();
    if (leaderboardDoc) {
      return leaderboardDoc.users;
    } else {
      return [];
    }

  },
});
