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
    let guess = ReactDOM.findDOMNode(this.refs.playerAnswer).value.trim();
    if(guess.length > 0){

      GoogleFu.GameController.savePlayerAnswer(FlowRouter.getParam('id'), Meteor.userId(), guess, (err, result) => {
        console.log(err, result);
        if(err){
          throw new Meteor.Error(err);
        }

        FlowRouter.go('/results/' + FlowRouter.getParam('id'));
      });
    }
  },

  render() {
    let timeRemaining = 0;
    let currentImage;
    let currentRound;
    if(this.data.game){
      console.log(this.data.game);
      currentImage = this.data.game.currentImage;
      currentRound = this.data.game.rounds.length;
    }
    let questionBGimgStyle = {
      backgroundImage : `url('${ currentImage }')`
    };

    return (
      <div className="game-play container">
        <h1>{ currentRound } <span className="time-remaining">{ timeRemaining }</span></h1>
        <div className="question-image" style={ questionBGimgStyle }></div>
        <textarea rows="3" ref="playerAnswer" placeholder="What would you Google to get this as your #1 image result?"></textarea>
        <button className="button button--blue" type="button" onClick={this._search}>Search</button>
      </div>
    )
  }
});
