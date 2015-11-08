JoinPrivateGame = React.createClass({
  _joinGame() {
    console.log('hallo');
  },

  render() {
    return (
      <div className="join-game container">
        <input type="text" ref="roomCode" placeholder="Room Code"/>
        <input type="text" ref="userName" placeholder="What is your name?" />
        <button className="button button--green" onClick={this._joinGame}>Join Game</button>
      </div>
    )
  }
});
