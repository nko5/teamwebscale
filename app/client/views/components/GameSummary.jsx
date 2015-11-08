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

    let scores = answers.reduce( (userScores, answer) =>{
      if(!userScores.hasOwnProperty(answer.user)) {
        userScores[answer.user] = 0;
      }
      userScores[answer.user] += answer.points;

      return userScores;
    }, {});

    let winner = scores.sort((a, b) => {
      return a.points - b.points;
    }).reverse()[0];

    let topPlayer = Meteor.users.findOne({_id: winner.user}).profile.name;

    return (
      <div className="game-play container">
        <h1>Our Winner Is</h1>
        <div>
          {topPlayer}
        </div>
        <button type="button" onClick={this._goHome}>Start Over</button>
      </div>
    );
  }
});
