CreatePrivateGame = React.createClass({
  _onClick() {
    console.log('hallo');
  },

  render() {
    return (
      <div className="home">
        <h1>Create Private Game</h1>
        <input name="name" />
        <button onClick={this._onClick}>Create Game</button>
      </div>
    )
  }
});
