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
    type: [Object],
  }
});

Games.attachSchema(Schemas.Game);