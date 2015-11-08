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

    Accounts.createUser({username: name + Math.random(), password: 'random', profile:{name: name}}, (err) => {
      if(err){
        throw new Meteor.Error('Could not create user');
      }

      createGame(gameTitle, Meteor.userId(), GoogleFu.Constants.PUBLIC_GAME, done);
    });
  }

  function createPrivateGame(name, done){
    let gameTitle = getGameTitle();
    let gameAccessCode = getGameAccessCode();

    Accounts.createUser({username: name + Math.random(), password: 'random', profile: {name: name}}, (err) => {
      if(err){
        throw new Meteor.Error('Could not create user');
      }
      
      createGame(gameTitle, Meteor.userId(), GoogleFu.Constants.PRIVATE_GAME, gameAccessCode, done); 
    });
  }

  return {
    createPublicGame: createPublicGame,
    createPrivateGame: createPrivateGame
  }
})();