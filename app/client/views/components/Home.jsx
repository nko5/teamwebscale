Home = React.createClass({
  _createPrivateGame() {
    FlowRouter.go('/private/new');
  },

  _createPrivateGame() {
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
        <div className="container">
          <h1 className="logo">
            <img src="/images/googlefu-logo.png" alt="Google-Fu"/>
            <small>Version 1.0</small>
          </h1>

          <button onClick={this._createPrivateGame}>Create a Private Game</button>
          <button onClick={this._joinPublicGame}>Join a Private Game</button>
          <button onClick={this._createPublicGame}>Create a Public Game</button>
          <button onClick={this._joinPrivateGame}>Join a Public Game</button>
        </div>
      </div>
    )
  }
});
