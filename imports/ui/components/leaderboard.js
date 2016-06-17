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
  flagImageUrl(match, team) {
    const teamName = Object.keys(match.result)[parseInt(team.charAt(team.length-1))-1]
    return "/images/flags/" + teamName.toLowerCase() + ".png";
  },
  lastMatch() {
    return Leaderboards.findOne().lastMatch
  },
  matchToString(match) {
    const team1 = Object.keys(match.result)[0]
    const team2 = Object.keys(match.result)[1]
    return ''
    + team1
    + ' '
    + match.result[team1]
    + ' - '
    + match.result[team2]
    + ' '
    + team2
  },
  emptyDelta(user) {
    return user.delta === undefined
  },
  deltaToString(user, match) {
    const delta = user.deltas[match.matchNumber].delta
    if (delta === undefined) {
      return ''
    } else if (typeof delta !== 'number') {
      return '-'
    } else {
      return '+' + delta
    }
  },
  deltaStyle(user, match) {
    const delta = user.deltas[match.matchNumber].delta
    if (delta === undefined) {
      return null
    }
    if (delta === 3) {
      return "background-color: #66FF99"
    } else if (delta === 1) {
      return "background-color: #FFFF99"
    } else if (delta === 0) {
      return "background-color: #FF9999"
    } else {
      return "background-color: #C8C8C8"
    }
  },
  leaderboard() {
    return Leaderboards.findOne()
  }
})
