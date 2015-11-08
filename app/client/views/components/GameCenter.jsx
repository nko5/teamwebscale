GameCenter = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      game : Games.findOne({
        _id: FlowRouter.getParam('id')
      })
    }
  },

  _search() {
    FlowRouter.go('/results/' + FlowRouter.getParam('id'));
  },

  render() {
    let timeRemaining = 0;
    let currentImage;
    let currentRound;
    if(this.data.game){
      console.log(this.data.game.currentImage);
      currentImage = this.data.game.currentImage;
      currentRound = this.data.game.round;
    }
    let questionBGimgStyle = {
      backgroundImage : `url('${ currentImage }')`
    };

    return (
      <div className="game-play container">
        <h1>{ currentRound } <span className="time-remaining">{ timeRemaining }</span></h1>
        <div className="question-image" style={ questionBGimgStyle }></div>
        <textarea rows="4" name="playerAnswer" placeholder="What would you Google to get this as your #1 image result?"></textarea>
        <button type="button" onClick={this._search}>Search</button>
      </div>
    )
  }
});
