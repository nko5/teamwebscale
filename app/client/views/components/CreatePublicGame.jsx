CreatePublicGame = React.createClass({
  _createGame() {
    let userName = ReactDOM.findDOMNode(this.refs.userName).value.trim();
    GoogleFu.GameController.createPublicGame(userName, (err, result)=>{
      console.log(err, result);

      //clear form
      ReactDOM.findDOMNode(this.refs.userName).value = "";
    });
  },

  render() {
    return (
      <div className="home">
        <h1>Create Public Game</h1>
        <input type="text" ref="userName" placeholder="What is your name?" />
        <button onClick={this._createGame}>Create Game</button>
      </div>
    )
  }
});
