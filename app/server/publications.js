Meteor.publish("joinPublicGames", function(){
  return Games.find({
                type: GoogleFu.Constants.PUBLIC_GAME, 
                status: GoogleFu.Constants.GAME_PENDING 
              });
});

Meteor.publish('game', function(gameId){
  return Games.find({_id: gameId});
});

Meteor.publish('gamePlayers', function(gameId){
  let players = Games.findOne({_id: gameId}).players;
  return Meteor.users.find({_id: {$in: players}});
});