GameResults = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
       game : Games.findOne({
        _id: FlowRouter.getParam('id')
      })
    }
  },

  _continue(event){

  },

  render() {
    let currentImage;
    let currentRound;
    let results;
    if(this.data.game){
      currentImage = this.data.game.currentImage;
      currentRound = this.data.game.rounds.length;
      results = this.data.game.answers.map((answer, idx) => {
        return <PlayerResult key={idx} answer={answer} />;
      });
    }
    let questionBGimgStyle = {
      backgroundImage : `url('${ currentImage }')`
    };

    return (
      <div className="game-results container">
        <h1 className="game-result-round">Round { currentRound }</h1>
        <div className="question-image tiny-question-image" style={ questionBGimgStyle }></div>
        <ul className="question-answer-list">
          { results }
        </ul>
        <button type="button" onClick={this._continue}>Next Round</button>
      </div>
    )
  }
});

PlayerResult = React.createClass({
  propTypes: {
    answer: React.PropTypes.object.isRequired
  },

  render() {
    let thumbnailStyle = {
      backgroundImage : `url('${ this.props.answer.image }')`
    };

    return (
      <li className="player-result">
        <div className="player-result-words">
          <h4 className="player-result-name">{this.props.answer.user}</h4>
          <p className="player-answer">{this.props.answer.guess}</p>
        </div>
        <div className="player-result-icons">
          <span className="player-result-status">{this.props.answer.points}</span>
          <span className="player-result-image-thumbnail" style={thumbnailStyle}></span>
        </div>
      </li>
    )
  }

});
