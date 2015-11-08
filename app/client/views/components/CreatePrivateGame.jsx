CreatePrivateGame = React.createClass({
  getInitialState() {
    return {
      warning : null
    };
  },

  _createGame() {
    let userName = ReactDOM.findDOMNode(this.refs.userName).value.trim();

    if (!userName) {
      // display error message
      this.setState({warning: 'Enter your name!'});
      return;
    }

    GoogleFu.GameController.createPrivateGame(userName, (err, result) => {
      FlowRouter.go('/lobby/' + result);
    });
  },

  render() {
    let warningTag = (this.state.warning) ? <p className="warning">{ this.state.warning }</p> : '';

    return (
      <div className="create-game container">
        {warningTag}
        <input type="text" ref="userName" placeholder="What is your name?" />
        <button className="button button--green" onClick={this._createGame}>Create Game</button>
      </div>
    )
  }
});
