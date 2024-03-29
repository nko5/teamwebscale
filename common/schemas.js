"use strict";
var Schemas = {};

Schemas.Game = new SimpleSchema({
  title: {
    type: String,
    label: "Game Title",
    max: 50
  },
  code: {
    type: String,
    label: "Game Code",
    max: 10,
    optional: true,
    custom: function () {
      var shouldBeRequired = this.field('type').value == GoogleFu.Constants.PRIVATE_GAME;

      if(shouldBeRequired){
        if (!this.operator) {
          if (!this.isSet || this.value === null || this.value === "") return "required";
        }

        else if (this.isSet) {
          if (this.operator === "$set" && this.value === null || this.value === "") return "required";
          if (this.operator === "$unset") return "required";
          if (this.operator === "$rename") return "required";
        }
      }
    }
  },
  type: {
    type: Number,
    allowedValues: [GoogleFu.Constants.PRIVATE_GAME, GoogleFu.Constants.PUBLIC_GAME],
  },
  players: {
    type: [String],
  },
  status: {
    type: Number,
    allowedValues: [GoogleFu.Constants.GAME_PENDING, GoogleFu.Constants.GAME_STARTED, GoogleFu.Constants.GAME_ENDED],
    defaultValue: GoogleFu.Constants.GAME_PENDING
  },
  currentImage: {
    type: Object,
    optional:true
  },
  'currentImage.url': {
    type: String
  },
  'currentImage.dimensions': {
    type: Object
  },
  'currentImage.dimensions.width': {
    type: String
  },
  'currentImage.dimensions.height': {
    type: String
  },
  currentQuery: {
    type: String,
    optional:true
  },
  currentRound: {
    type: Number,
    defaultValue: 0
  },
  answers: {
    type:[Object],
    optional: true
  },
  "answers.$.round": {
    type: Number
  },
  "answers.$.user": {
    type: String
  },
  "answers.$.image": {
    type: String
  },
  "answers.$.guess":{
    type: String
  },
  "answers.$.points": {
    type: Number
  },
  rounds: {
    type: [Object],
    optional: true
  },
  "rounds.$.image": {
    type: Object
  },
  "rounds.$.image.url": {
    type: String
  },
  "rounds.$.image.dimensions": {
    type: Object
  },
  "rounds.$.image.dimensions.width": {
    type: String
  },
  "rounds.$.image.dimensions.height": {
    type: String
  },
  "rounds.$.correctAnswer": {
    type:String
  }
});

Games.attachSchema(Schemas.Game);
