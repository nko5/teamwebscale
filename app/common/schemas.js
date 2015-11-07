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
      var shouldBeRequired = this.field('type').value == 0;

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
    allowedValues: [0, 1],
  },
  players: {
    type: [Object],
    optional: true
  }
});

Games.attachSchema(Schemas.Game);