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
      <div className="home center-container">
        <div className="container">
          <h1 className="logo">
            <img src="/images/googlefu-logo.png" alt="Google-Fu"/>
            <small>Version 1.0</small>
          </h1>

          <div className="private__buttons">
            <button className="button button--green" onClick={this._createPrivateGame}>Create a Private Game</button>
            <button className="button button--green" onClick={this._joinPrivateGame}>Join a Private Game</button>
          </div>
          <div className="public__buttons">
            <button className="button button--blue" onClick={this._createPublicGame}>Create a Public Game</button>
            <button className="button button--blue" onClick={this._joinPublicGame}>Join a Public Game</button>
          </div>
        </div>
      </div>
    )
  }
});
