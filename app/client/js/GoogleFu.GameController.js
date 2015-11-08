GoogleFu.GameController = (function(){
  function createGame(title, userId, type, code, done){
    //since code can be optional make sure fourth argument is not callback and swap if so
    if(typeof code === 'function'){
      done = code,
      code = null
    }

    Games.insert({
      title: title, 
      type: type, 
      code: code,
      status: GoogleFu.Constants.GAME_PENDING, 
      players: [userId]
    }, (err, result) => {
      if(err) return done(err);

      done(null, result);
    });
  }

  function getGameTitle(){
    //TODO: Implement random game title generator
    return "Ooogle Octupus";
  }

  function getGameAccessCode(){
    //TODO: Swap '123' out with solution for random game code
    return "123";
  }

  function createPublicGame(name, done){
    let gameTitle = getGameTitle();

    Meteor.users.update(
      {_id: Meteor.userId()}, 
      {$set:{'profile.name': name}}, 
      (err, result) => {
        createGame(gameTitle, 
                    Meteor.userId(), 
                    GoogleFu.Constants.PUBLIC_GAME, 
                    done);
      }
    );
  }

  function createPrivateGame(name, done){
    let gameTitle = getGameTitle();
    let gameAccessCode = getGameAccessCode();

    Meteor.users.update(
      {_id: Meteor.userId()}, 
      {$set:{'profile.name': name}},
      (err, result) => {
        createGame(gameTitle, 
                    Meteor.userId(), 
                    GoogleFu.Constants.PRIVATE_GAME, 
                    gameAccessCode, 
                    done); 
      }
    );
  }

  function joinGame(gameId, userName, done){
   if(!gameId || !Meteor.userId()){
    throw new Meteor.Error('Invalid Params to Join Game');
   }

   Meteor.users.update(
      {_id: Meteor.userId()}, 
      {$set:{'profile.name': name}},
      (err, result) => {
        Games.update({_id: gameId},
                    {$push: {players: Meteor.userId()}}
        , (err, result) => {
          if(err) return done(err);

          done(null, result);
        }); 
      }
    );
  }

  return {
    createPublicGame: createPublicGame,
    createPrivateGame: createPrivateGame,
    joinGame: joinGame
  }
})();