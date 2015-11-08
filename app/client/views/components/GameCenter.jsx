GameCenter = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      game : Games.find({
        _id: FlowRouter.getParam('id')
      }).fetch()
    }
  },

  _search() {
    FlowRouter.go('/results/' + FlowRouter.getParam('id'));
  },

  render() {
    let timeRemaining = 0;
    let questionBGimgStyle = {
      backgroundImage : `url('${ this.data.game.currentImage }')`
    };

    return (
      <div className="game-play container">
        <h1>{ this.data.game.round } <span className="time-remaining">{ timeRemaining }</span></h1>
        <div className="question-image" style={ questionBGimgStyle }></div>
        <input type="text" name="playerAnswer" />
        <button type="button" onClick={this._search}>Search</button>
      </div>
    )
  }
});
