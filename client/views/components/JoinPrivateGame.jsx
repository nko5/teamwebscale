JoinPrivateGame = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      warning: null
    };
  },

  getMeteorData() {
    return {
      games: Games.find({}).fetch()
    }
  },

  onChildChanged(newState) {
    this.setState({warning: newState});
  },

  _resetError(event){
    this.setState({ warning:null });
  },

  _joinGame() {
    let roomCode = ReactDOM.findDOMNode(this.refs.roomCode).value.trim();
    let userName = ReactDOM.findDOMNode(this.refs.userName).value.trim();

    if (!userName) {
      // display error message
      this.setState({warning: 'Enter your name!'});
      return;
    }

    if (!roomCode) {
      // display error message
      this.setState({warning: 'Enter a room code!'});
      return;
    }

    GoogleFu.GameController.joinPrivateGame(userName, roomCode, (err, result) => {
      if(err){
        this.setState({warning: err});
        return;
      } 

      FlowRouter.go('/lobby/' + result);
    });
  },

  render() {
    let warningTag = (this.state.warning)? <p className="warning">{ this.state.warning }</p> : '';

    return (
      <div className="join-game container">
        { warningTag }
        <input type="text" ref="roomCode" placeholder="Room Code"/>
        <input type="text" ref="userName" placeholder="What is your name?" />
        <button className="button button--green" onClick={this._joinGame}>Join Game</button>
      </div>
    )
  }
});
