JoinPrivateGame = React.createClass({
  _joinGame() {
    console.log('hallo');
  },

  render() {
    return (
      <div className="home">
        <h1>Join Private Game</h1>
        <input name="name" />
        <input name="roomCode" />
        <button onClick={this._joinGame}>Join Game</button>
      </div>
    )
  }
});
