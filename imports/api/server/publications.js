import { Meteor } from 'meteor/meteor'

import { Leaderboards} from '../leaderboards.js'
import { Matches } from '../matches.js'
import { Bets } from '../bets.js'
import { Results } from '../results.js'

Meteor.publish('leaderboards', function() {
  return Leaderboards.find({}, {limit: 1, sort: {ts: -1}})
})

Meteor.publish('matches', function () {
  return Matches.find({}, {limit: 1, sort: {ts: -1}})
})

Meteor.publish('bets.my', function () {
  if (!this.userId) {
    return this.ready();
  }

  return Bets.find({ userId: this.userId }, {limit: 1, sort: {ts: -1}})
})

Meteor.publish('results', function () {
  return Results.find({}, {limit: 1, sort: {ts: -1}})
})
