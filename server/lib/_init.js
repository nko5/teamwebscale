GoogleFu = {};

//Create application wide Constants and freeze object for true read only behavior
GoogleFu.Constants = {
  SETTINGS : {
    TOTAL_ROUNDS : 10
  },
  PRIVATE_GAME : 0,
  PUBLIC_GAME : 1,
  GAME_PENDING: 2,
  GAME_STARTED: 3,
  GAME_ENDED: 4
};

Object.freeze(GoogleFu.Constants);
