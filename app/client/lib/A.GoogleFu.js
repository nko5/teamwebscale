GoogleFu = {};
Meteor.startup(function(){
  console.log('startup');
  //Setup GoogleFu namespace at startup
  // GoogleFu = {};

  //Create application wide Constants and freeze object for true read only behavior
  GoogleFu.Constants = {
    PRIVATE_GAME : 0,
    PUBLIC_GAME : 1
  };

  Object.freeze(GoogleFu.Constants);
});