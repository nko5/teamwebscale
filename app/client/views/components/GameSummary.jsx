GameSummary = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      game : Games.findOne({
        _id: FlowRouter.getParam('id')
      })
    };
  },

  _goHome() {
    FlowRouter.go('/');
  },

  render() {

    return (
      <div className="game-play container">
        <h1>Game Summary</h1>
        <button type="button" onClick={this._goHome}>Start Over</button>
      </div>
    );
  }
});
