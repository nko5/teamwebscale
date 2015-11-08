GameResults = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
       game : Games.find({
        _id: FlowRouter.getParam('id')
      }).fetch()
    }
  },

  render() {
    return (
      <h1>Results</h1> 
    )
  }
});