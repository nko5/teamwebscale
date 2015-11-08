CreatePrivateGame = React.createClass({
  _createPrivateGame() {
    let userName = ReactDOM.findDOMNode(this.refs.userName).value.trim();
    GoogleFu.GameController.createPrivateGame(userName, (err, result) => {
      FlowRouter.go('/lobby/' + result);
    });
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
