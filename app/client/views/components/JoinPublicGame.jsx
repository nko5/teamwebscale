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
      <div className="join-game container">
        <input name="name" placeholder="What is your name?"/>
        <h3>Choose a Room</h3>
        <ul className="rooms">
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
      <li>
        <a href="#" className="button button--blue" onClick={this._joinGame}>
          {this.props.game.title}
        </a>
      </li>
    );
  }
});
