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

  },

  render() {
    let currentGame = this.data.games[0];
    let gameTitle;

    if (currentGame) {
      gameTitle = currentGame.title;
    }

      return <GamePlayers key={game._id} game={game} />
    });

    return (
      <div className="home">
        <button onClick={this._startGame}>Start Game</button>
        <button onClick={this._leaveGame}>Leave Game</button>
        {game}
          <h3>{gameTitle}</h3>
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
      return <Player key={player._id} player={player} />;
    });

    return (
         <ul>
          {players}
        </ul>
    )
  }
});

Player = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    player: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <li>{this.props.player.profile.name}</li>
    );
  }
});
