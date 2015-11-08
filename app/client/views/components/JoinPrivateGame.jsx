JoinPrivateGame = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      games: Games.find({}).fetch()
    }
  },

  _joinGame() {
    let roomCode = ReactDOM.findDOMNode(this.refs.roomCode).value.trim();
    let userName = ReactDOM.findDOMNode(this.refs.userName).value.trim();
    GoogleFu.GameController.joinPrivateGame(userName, roomCode, (err, result) => {
      if(err){
        throw new Meteor.Error(err);
      } 

      FlowRouter.go('/lobby/' + result);
    });
  },

  render() {
    return (
      <div className="home">
        <h1>Join Private Game</h1>
        <input type="text" ref="roomCode" placeholder="Room Code"/>
        <input type="text" ref="userName" placeholder="What is your name?" />
        <button onClick={this._joinGame}>Join Game</button>
      </div>
    )
  }
});
