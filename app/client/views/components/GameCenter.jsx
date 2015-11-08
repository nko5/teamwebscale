GameCenter = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      games: Games.find({
        _id: FlowRouter.getParam('id')
      }).fetch()
    }
  },

  render() {
    return (
      <h1>This is a game</h1>
    )
  }
});