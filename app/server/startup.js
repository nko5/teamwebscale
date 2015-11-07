GoogleFu = {};

Meteor.startup(function(){
  //Setup GoogleFu namespace at startup

  //Create application wide Constants and freeze object for true read only behavior
  GoogleFu.Constants = {
    PRIVATE_GAME : 0,
    PUBLIC_GAME : 1
  };

  Object.freeze(GoogleFu.Constants);
});