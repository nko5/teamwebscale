Meteor.publish("joinPublicGames", function(){
  return Games.find({
                type: GoogleFu.Constants.PUBLIC_GAME, 
                status: GoogleFu.Constants.GAME_PENDING 
              });
});