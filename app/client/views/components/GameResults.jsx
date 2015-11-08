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
      results = this.data.game.players.map( playerId => {
        return Meteor.users.findOne({ _id : playerId });
      }).map( player => {
        let playerAnswer = JSON.parse(JSON.stringify(player)); // clone
        let playerAnswers = this.data.game.answers.filter( answer => answer.user == playerAnswer._id );
        if( playerAnswers.length > 0 ){
          // there's an answer, display it

          playerAnswer.guess = playerAnswers[0].guess;
          playerAnswer.image = playerAnswers[0].image;
          playerAnswer.points = playerAnswers[0].points;
        }else{
          playerAnswer.guess = 'still thinking...';
        }
        return playerAnswer;
      }).map( (player, idx) => {
        return <PlayerResult key={idx} player={player} />;
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
    player: React.PropTypes.object.isRequired
  },

  render() {
    let thumbnailStyle = {
      backgroundImage : `url('${ this.props.player.image }')`
    };

    return (
      <li className="player-result">
        <div className="player-result-words">
          <h4 className="player-result-name">{this.props.player.profile.name}</h4>
          <p className="player-answer">{this.props.player.guess}</p>
        </div>
        <div className="player-result-icons">
          <span className="player-result-status">{this.props.player.points}</span>
          <span className="player-result-image-thumbnail" style={thumbnailStyle}></span>
        </div>
      </li>
    )
  }

});
