JoinPublicGame = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      games:  Games.find({
                type: GoogleFu.Constants.PUBLIC_GAME, 
                status: GoogleFu.Constants.GAME_PENDING 
              }).fetch()
    }
  },

  renderGames() {
    return this.data.games.map((game) => {
      return <Game key={game._id} game={game} />;
    });
  },

  render() {
    return (
      <div className="home">
        <h1>Join Public Game</h1>
        <input name="name" placeholder="What is your name?"/>
        <h3>Choose A Room</h3>
        <ul>
          { this.renderGames() }
        </ul>
      </div>
    )
  }
});

Game = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    game: React.PropTypes.object.isRequired
  },

  _joinGame() {
    GoogleFu.GameController.joinGame(this.props.game._id, Meteor.userId(), (err, result) => {
      if(err) throw new Meteor.Error(err);

      FlowRouter.go('/public/lobby/' + this.props.game._id); 
    });
  },

  render() {
    return (
      <li onClick={this._joinGame}>{this.props.game.title}</li>
    );
  }
});