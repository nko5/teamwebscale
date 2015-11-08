CreatePublicGame = React.createClass({
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

    GoogleFu.GameController.createPublicGame(userName, (err, result)=>{
      FlowRouter.go('/lobby/' + result);
    });
  },

  _resetError(event){
    this.setState({ warning : null });
  },

  render() {
    let warningTag = (this.state.warning) ? <p className="warning">{ this.state.warning }</p> : '';

    return (
      <div className="create-game container">
        {warningTag}
        <input type="text" ref="userName" placeholder="What is your name?" onChange={this._resetError} />
        <button className="button button--blue" onClick={this._createGame}>Create Game</button>
      </div>
    )
  }
});
