CreatePrivateGame = React.createClass({
  _createPrivateGame() {
    console.log('hallo');
  },

  render() {
    return (
      <div className="create-game">
        <div className="container">
          <input type="text" ref="userName" placeholder="What is your name?" />
          <button className="button button--green" onClick={this._createPrivateGame}>Create Game</button>
        </div>
      </div>
    )
  }
});
