CreatePrivateGame = React.createClass({
  _createPrivateGame() {
    console.log('hallo');
  },

  render() {
    return (
      <div className="home">
        <h1>Create Private Game</h1>
        <input name="name" />
        <button onClick={this._createPrivateGame}>Create Game</button>
      </div>
    )
  }
});