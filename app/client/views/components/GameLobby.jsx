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
  },

  _leaveGame() {

  },

  render() {

    let game = this.data.games.map((game) => {
      return <GamePlayers key={game._id} game={game} />
    });
    
    return (
      <div className="home">
        <h1>Public Game</h1>
        <button onClick={this._startGame}>Start Game</button>
        {game}
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
