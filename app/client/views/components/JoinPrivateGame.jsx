JoinPrivateGame = React.createClass({
  _joinGame() {
    console.log('hallo');
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
