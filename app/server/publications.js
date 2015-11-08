Meteor.publish("joinPublicGames", function(){
  return Games.find({
                type: GoogleFu.Constants.PUBLIC_GAME, 
                status: GoogleFu.Constants.GAME_PENDING 
              });
});

Meteor.publish("joinPrivateGames", function(){
  return Games.find({
    type: GoogleFu.Constants.PRIVATE_GAME,
    status: GoogleFu.Constants.GAME_PENDING
  },
  {fields: {'code': 1, '_id': 1}});
});

Meteor.publish('game', function(gameId){
  return Games.find({_id: gameId});
});

Meteor.publish('gamePlayers', function(gameId){
  let players = Games.findOne({_id: gameId}).players;
  return Meteor.users.find({_id: {$in: players}});
});