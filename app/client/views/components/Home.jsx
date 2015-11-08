Home = React.createClass({
  _createPrivateGame() {
    FlowRouter.go('/private/new');
  },

  _createPublicGame() {
    FlowRouter.go('/public/new');
  },


  _joinPrivateGame() {
    FlowRouter.go('/private/join');
  },

  _joinPublicGame() {
    FlowRouter.go('/public/join');
  },

  render() {
    return (
      <div className="home">
        <h1>Google Fu</h1>
        <button onClick={this._createPrivateGame}>Create a Private Game</button>
        <button onClick={this._joinPrivateGame}>Join a Private Game</button>
        <button onClick={this._createPublicGame}>Create a Public Game</button>
        <button onClick={this._joinPublicGame}>Join a Public Game</button>
      </div>
    )
  }
});
