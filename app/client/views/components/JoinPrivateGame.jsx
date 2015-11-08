JoinPrivateGame = React.createClass({
  _joinGame() {
    console.log('hallo');
  },

  render() {
    return (
      <div className="home">
        <h1>Join Private Game</h1>
        <input type="text" ref="userName" placeholder="What is your name?" />
        <input type="text" ref="roomCode" />
        <button onClick={this._joinGame}>Join Game</button>
      </div>
    )
  }
});
