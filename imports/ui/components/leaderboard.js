import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'

import { Leaderboards } from '../../api/leaderboards.js'

import './leaderboard.html'

Template.App_leaderboard.onCreated(function() {
  this.subscribe('leaderboards')
})

Template.App_leaderboard.helpers({
  users() {
    return Leaderboards.findOne().users
  },
  flagImageUrl(team) {
    return "/images/flags/" + team.toLowerCase() + ".png";
  },
  lastMatch() {
    return Leaderboards.findOne().lastMatch
  },
  lastMatchTeamsAndScore() {
    const lastMatch = Leaderboards.findOne().lastMatch
    return ''
    + lastMatch.team1
    + ' '
    + lastMatch.result[lastMatch.team1]
    + ' - '
    + lastMatch.result[lastMatch.team2]
    + ' '
    + lastMatch.team2
  },
  emptyDelta(user) {
    return user.delta === undefined
  },
  deltaStyle(delta) {
    if (delta === 3) {
      return "background-color: #66FF99"
    } else if (delta === 1) {
      return "background-color: #FFFF99"
    } else if (delta === 0) {
      return "background-color: #FF9999"
    } else {
      return "background-color: #C8C8C8"
    }
  }
})
