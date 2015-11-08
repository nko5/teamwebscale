CreatePublicGame = React.createClass({
  _createGame() {
    let userName = ReactDOM.findDOMNode(this.refs.userName).value.trim();
    GoogleFu.GameController.createPublicGame(userName, (err, result)=>{
      FlowRouter.go('/lobby/' + result);
    });
  },

  render() {
    return (
      <div className="create-game">
        <div className="container">
          <input type="text" ref="userName" placeholder="What is your name?" />
          <button className="button button--blue" onClick={this._createGame}>Create Game</button>
        </div>
      </div>
    )
  }
});
