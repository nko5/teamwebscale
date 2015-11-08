GameResults = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      game : Games.findOne({
        _id: FlowRouter.getParam('id')
      }),
      results : []
    };
  },

  _continueNextRound(){
    GoogleFu.GameController.startGame(FlowRouter.getParam('id'),
      (err, result) => {
        if(err) {
          throw new Meteor.Error(err);
        }

        FlowRouter.go('/play/' + FlowRouter.getParam('id'));
      });
  },


  /*
   * when all players submit
   *   do scoring
   */
  _checkAllResults(){
    let allSubmitted = this.data.game.answers.length == this.data.game.players.length;
    if(allSubmitted){
      // show all answers
      this.data.results.forEach( result => {
        result.guessDisplay = result.guess;
        result.correctClass = result.points > 0 ? 'answer-correct' : 'answer-wrong';
      });
    }
    return allSubmitted;
  },

  _handleRoundBumping() {

    if( Session.get('gameRound') == null ){
      // initial setting
      Session.set('gameRound', this.data.game.currentRound );
    }else if( this.data.game.currentRound > Session.get('gameRound') ){
      // round bumped, move everyone into next round
      // if( this.data.game.currendRound > GoogleFu.Constants.SETTINGS.TOTAL_ROUNDS ){
      if( this.data.game.currendRound > 10 ){
        FlowRouter.go('/summary/' + FlowRouter.getParam('id'));
      }else{
        FlowRouter.go('/play/' + FlowRouter.getParam('id'));
      }
    }

  },

  componentWillUnmount() {
    Session.set('gameRound', null);
  },

  render() {
    let currentImage;
    let currentRound;
    let playerResults;
    let nextRoundStyles;
    if(this.data.game){

      this._handleRoundBumping();

      currentImage = this.data.game.currentImage;
      currentRound = this.data.game.rounds.length;
      this.data.results = this.data.game.players.map( playerId => {
        return Meteor.users.findOne({ _id : playerId });
      }).map( player => {
        let playerAnswer = JSON.parse(JSON.stringify(player)); // clone
        let playerAnswers = this.data.game.answers.filter( answer => answer.user == playerAnswer._id );
        if( playerAnswers.length > 0 ){
          // there's an answer, display it

          playerAnswer.guess = playerAnswers[0].guess;
          playerAnswer.guessDisplay = 'done';
          playerAnswer.image = playerAnswers[0].image;
          playerAnswer.points = playerAnswers[0].points;
        }else{
          playerAnswer.guess = null;
          playerAnswer.guessDisplay = 'still thinking...';
          playerAnswer.image = null;
          playerAnswer.points = null;
        }
        playerAnswer.correctClass = 'answer-pending';
        return playerAnswer;
      });

      // update done/waiting statuses
      let allResultsSubmitted = this._checkAllResults();

      if(allResultsSubmitted){
        nextRoundStyles = { display : 'block' };
      }else{
        nextRoundStyles = { display : 'none' };
      }

      playerResults = this.data.results.map( (player, idx) => {
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
          { playerResults }
        </ul>
        <button type="button" onClick={this._continueNextRound} style={nextRoundStyles}>Next Round</button>
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

    let answerResultStatusClass = `player-result-status ${this.props.player.correctClass}`;

    return (
      <li className="player-result">
        <div className="player-result-words">
          <h4 className="player-result-name">{this.props.player.profile.name}</h4>
          <p className="player-answer">{this.props.player.guessDisplay}</p>
        </div>
        <div className="player-result-icons">
          <span className={answerResultStatusClass}>{this.props.player.points}</span>
          <span className="player-result-image-thumbnail" style={thumbnailStyle}></span>
        </div>
      </li>
    )
  }

});
