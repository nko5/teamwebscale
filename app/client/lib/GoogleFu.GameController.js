GoogleFu.GameController = (function(){
  function createGame(name, type, code, done){
    Games.insert({title: name, type: type, code: code}, function(err, result){
      if(err) return done(err);

      done(null, result);
    });
  }

  function createPublicGame(name, done){
    createGame(name, GoogleFu.Constants.PUBLIC_GAME, done);
  }

  function createPrivateGame(name, done){
    //TODO: Swap '123' out with solution for random game code
    createGame(name, GoogleFu.Constants.PRIVATE_GAME, '123', done); 
  }

  return {
    createPublicGame: createPublicGame,
    createPrivateGame: createPrivateGame
  }
})();