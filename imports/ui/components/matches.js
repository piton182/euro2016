import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { ReactiveDict } from 'meteor/reactive-dict'

import { Matches } from '../../api/matches.js'
import { Bets } from '../../api/bets.js'

import './matches.html'

Template.App_matches.onCreated(function() {
  this.state = new ReactiveDict()
  this.state.setDefault({
    matches: {},
    showMyBets: false,
    placingBets: false,
  })

  this.subscribe('matches')
  this.subscribe('bets.my', () => {
    const matches = Matches.findOne().matches.reduce((acc, match) => {
      acc[match.number] = match;
      return acc;
    }, {})
    const myBetsDoc = Bets.findOne();
    if (myBetsDoc) {
      const myBets = myBetsDoc.bets;
      myBets.forEach((bet) => { matches[bet.matchNumber].bet = bet.bet })
    }
    Object.keys(matches).forEach((matchNumber) => {
      matches[matchNumber].bet = matches[matchNumber].bet || {}
    })
    this.state.set('matches', matches)
  })
})

Template.App_matches.helpers({
  matches() {
    const instance = Template.instance()
    const matches = instance.state.get('matches')
    return Object.keys(matches).map((key) => { return matches[key] })
  },
  placingBets() {
    const instance = Template.instance()
    return instance.state.get('placingBets');
  },
  notPlacingBets() {
    const instance = Template.instance()
    return !instance.state.get('placingBets');
  },
  noBet(match) {
    return !(match.bet.team1Score || match.bet.team2Score);
  },
  score(match, team) {
    return match.bet[team];
  },
  showBets() {
    const instance = Template.instance()
    return instance.state.get('showMyBets')
  },
})

Template.App_matches.events({
  'blur .js-score'(event, instance) {
    const matches = instance.state.get('matches')
    matches[this.number].bet[event.target.id.split(':')[1]] = event.target.value
    // console.log(matches)
    instance.state.set('matches', matches)
  },

  'click .js-save-bets'(event, instance) {
    // console.log(instance.state.get('matches'))
    const myNewBets = []
    const matches = instance.state.get('matches')
    Object.keys(matches).forEach((matchNumber) => {
      const match = matches[matchNumber]
      const bet = match.bet
      if (bet[match.team1] && !bet[match.team2]) {
        matches[matchNumber].bet[match.team2] = "0"
      } else if (!bet[match.team1] && bet[match.team2]) {
        matches[matchNumber].bet[match.team1] = "0"
      }
    });
    Object.keys(matches).forEach((matchNumber) => {
      const match = matches[matchNumber]
      const bet = match.bet
      if (bet[match.team1] && bet[match.team2]) {
        myNewBets.push({
          matchNumber,
          bet
        })
      }
    });
    Bets.insert({
      userId: Meteor.userId(),
      ts: new Date(),
      bets: myNewBets
    })
    instance.state.set('placingBets', false)
    instance.state.set('matches', matches)
  },
  'click .js-start-placing-bets'(event, instance) {
    instance.state.set('placingBets', true)
  },
  'click .js-show-my-bets'(event, instance) {
    instance.state.set('showMyBets', true)
  },
  'click .js-hide-my-bets'(event, instance) {
    instance.state.set('showMyBets', false)
  }
})
