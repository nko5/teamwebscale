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

  getInitialState() {
    return {
      warning : null
    };
  },

  onChildChanged(newState) {
    this.setState({ warning : newState });
  },

  _resetError(event){
    this.setState({ warning : null });
  },

  _createPublicGame() {
    FlowRouter.go('/public/new');
  },

  render() {
    let games = this.data.games.map((game) => {
      return <Game key={game._id} game={game} userName={this.refs.userName} callbackParent={this.onChildChanged} />;
    });

    let warningTag = (this.state.warning)? <p className="warning">{ this.state.warning }</p> : '';

    if (!this.data.games.length) {
      return (
        <div className="join-game container">
          <h3 className="text-center">All games are currently in progress.</h3>
          <button className="button button--blue" onClick={this._createPublicGame}>Create a new Game</button>
        </div>
      )
    }

    return (
      <div className="join-game container">
        { warningTag }
        <input ref="userName" placeholder="What is your name?" onChange={this._resetError} />
        <h3>Choose a Room</h3>
        <ul className="rooms">
          {games}
        </ul>
      </div>
    )
  }
});

Game = React.createClass({
  propTypes: {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    game: React.PropTypes.object.isRequired,
    userName: React.PropTypes.object.isRequired
  },

  _joinGame() {
    let userName = this.props.userName ? this.props.userName.value.trim() : '';

    if(!userName){
      // display error message
      this.props.callbackParent('Enter your name!');
      return;
    }

    GoogleFu.GameController.joinGame(this.props.game._id, userName, (err, result) => {
      if(err) throw new Meteor.Error(err);

      FlowRouter.go('/lobby/' + this.props.game._id);
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
