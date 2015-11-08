GameLobby = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      games:  Games.find({
                _id: FlowRouter.getParam('id')
              }).fetch()
    };
  },

  _startGame() {
    GoogleFu.GameController.startGame(FlowRouter.getParam('id'),
      (err, result) => {
        if(err) {
          throw new Meteor.Error(err);
        }

        FlowRouter.go('/play/' + FlowRouter.getParam('id'));
      });
  },

  _leaveGame() {
    GoogleFu.GameController.leaveGame(FlowRouter.getParam('id'),
      (err, result) => {
        if(err){
          throw new Meteor.Error(err);
        } 

        FlowRouter.go('/');
      });
  },

  render() {
    let currentGame = this.data.games[0];
    let gameTitle;

    if (currentGame) {
      gameTitle = currentGame.title;
    }

    let players = this.data.games.map((game) => {
      return <GamePlayers key={game._id} game={game} />
    });

    return (
      <div className="game-lobby">
        <div className="container">
          <h3>
            {gameTitle}
            <small>Waiting for people to join...</small>
          </h3>
          {players}
          <button className="button button--blue" onClick={this._startGame}>Start Game</button>
          <button className="button button--gray" onClick={this._leaveGame}>Leave Game</button>
        </div>
      </div>
    )
  }
});

GamePlayers = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      players: Meteor.users.find({_id: {$in: this.props.game.players}}).fetch()
    };
  },

  render() {
    let players = this.data.players.map((player) => {
      return <Player key={player._id} player={player} game={this.props.game} />;
    });

    return (
      <ol className="players-list" >
        {players}
      </ol>
    )
  }
});

Player = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    player: React.PropTypes.object.isRequired,
    game: React.PropTypes.object.isRequired
  },

  _removePlayer() {
    // remove player here
    GoogleFu.GameController.removePlayer(this.props.game._id, 
      this.props.player._id, 
      (err, result) => {
        if(err){
          throw new Meteor.Error(err);
        }
    })
  },

  render() {
    return (
      <li className="players-list__item">
        {this.props.player.profile.name}
        <a href="#" className="close-icon close-icon--gray hide-text" onClick={this._removePlayer}>Dismiss</a>
      </li>
    );
  }
});
