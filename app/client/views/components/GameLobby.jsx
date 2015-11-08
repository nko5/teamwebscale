GameLobby = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      game:  Games.findOne({
                _id: FlowRouter.getParam('id')
              })
    };
  },

  renderPlayerSection() {
    return <GamePlayers key={this.data.game._id} game={this.data.game} />
  },

  _startGame() {
  },

  _leaveGame() {

  },

  render() {
    return (
      <div className="home">
        <h1>Public Game</h1>
        <button onClick={this._startGame}>Start Game</button>
        <button onClick={this._leaveGame}>Leave Game</button>
        { this.renderPlayerSection() }
      </div>
    )
  }
});

GamePlayers = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      game: Games.findOne({_id: this.props.game._id}),
      players: Meteor.users.find({_id: {$in: this.props.game.players}}).fetch()
    };
  },

  renderPlayers() {
    return this.data.players.map((player) => {
      return <Player key={player._id} player={player} />;
    });
  },

  render() {
    return (
         <ul>
          { this.renderPlayers() }
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
