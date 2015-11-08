'use strict';

/* global
  GoogleFu,
  HTTP,
  Meteor,
  Games
*/

GoogleFu.GameController = (function(){
  function createGame(userId, type, done){
    // gameCodes are always autogenerated on creation
    //   #todo check for duplicates!
    let gameCode = GoogleFu.GameName.generate();

    Games.insert({
      title: gameCode.name,
      type: type,
      code: gameCode.code,
      status: GoogleFu.Constants.GAME_PENDING,
      players: [userId],
      currentImage: null, // image being displayed this round
      currentQuery: null,  // query used to get currentImage
      round: 0
    }, (err, result) => {
      if(err) return done(err);

      done(null, result);
    });
  }

  function createPublicGame(name, done){
    Meteor.users.update(
      {_id: Meteor.userId()},
      {$set:{'profile.name': name}},
      (err, result) => {
        createGame(Meteor.userId(),
                    GoogleFu.Constants.PUBLIC_GAME,
                    done);
      }
    );
  }

  function createPrivateGame(name, done){
    Meteor.users.update(
      {_id: Meteor.userId()},
      {$set:{'profile.name': name}},
      (err, result) => {
        createGame(Meteor.userId(),
                    GoogleFu.Constants.PRIVATE_GAME,
                    done);
      }
    );
  }

  function joinPublicGame(gameId, userName, done){
    if(!gameId || !Meteor.userId()){
     throw new Meteor.Error('Invalid Params to Join Game');
    }

    addUserToGame(gameId, userName, done);
  }

  function joinPrivateGame(userName, roomCode, done){
    if(!roomCode || !Meteor.userId()){
     throw new Meteor.Error('Invalid Params to Join Game');
    }

    var game = Games.findOne({code: roomCode});

    if(!game){
      return done('Invalid Room Code');
    }

    addUserToGame(game._id, userName, (err, result) => {
      if(err) return done(err);

      done(null, game._id);
    });
  }

  function addUserToGame(gameId, userName, done){
    if(!gameId || !Meteor.userId()){
      throw new Meteor.Error('Invalid Params to Join Game');
    }

    Meteor.users.update(
      {_id: Meteor.userId()},
      {$set:{'profile.name': userName}},
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

  function removePlayer(gameId, userId, done){
    if(!gameId){
      throw new Meteor.Error('Invalid Game Id');
    }

    Games.update({_id: gameId},
                  {
                    $pull: {
                      players: {$in: [userId]}
                    }
                  }
                  , (err, result) => {
                    console.log(err, result);
                    if(err) return done(err);

                    done(null, result);
                  });
  }

  function leaveGame(gameId, done){
    removePlayer(gameId, Meteor.userId(), done);
  }

  function startGame(gameId, done){
    if(!gameId){
      throw new Meteor.Error('Invalid Game Id');
    }

    let serverip = GoogleFu.IP.getAddress();
    let randomQuery = GoogleFu.Query.random();
    Meteor.call('GoogleFu.Image.getTopThumbnail', serverip, randomQuery, (err, topResultThumbnail) => {
      let firstRoundObject = {'image': topResultThumbnail,
                              'correctAnswer': randomQuery
                              };

      Games.update({_id: gameId},
                    {
                      $push: {rounds: firstRoundObject},
                      $set: {
                        status: GoogleFu.Constants.GAME_STARTED,
                        currentImage : topResultThumbnail,
                        currentQuery : randomQuery
                    }}
                    , (err, result) => {
                      if(err) return done(err);

                      done(null, result);
                    });
    });

  }

  function savePlayerAnswer(gameId, userId, answer, done){
    if(!gameId){
      throw new Meteor.Error('Invalid Game Id');
    }

    // #todo Jason, get client's ip
    let userip = GoogleFu.IP.getAddress();

    let currentGame = Games.findOne({_id: gameId});
    Meteor.call('GoogleFu.Image.getTopThumbnail', userip, answer, (err, topThumbnail) => {
      Meteor.call('GoogleFu.Image.match', userip, currentGame.currentQuery, answer, (err, matches) => {
        let currentUserResult = {'user': userId,
                                  'guess': answer,
                                  'points': 0,
                                  'round': currentGame.currentRound,
                                  'image': topThumbnail.url,
                                  'correctAnswer': currentGame.currentQuery
                               };

        Games.update({_id: gameId},
          {
            $push: {
              'answers': currentUserResult
            }
          },
          (err, result) => {
            if(err) return done(err);

            done(null, result);
          });

      });
    });
  }

  return {
    createPublicGame: createPublicGame,
    createPrivateGame: createPrivateGame,
    joinPublicGame: joinPublicGame,
    joinPrivateGame: joinPrivateGame,
    leaveGame: leaveGame,
    removePlayer: removePlayer,
    startGame: startGame,
    savePlayerAnswer: savePlayerAnswer
  }
})();
