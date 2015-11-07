Home = React.createClass({
  _onClick() {
    console.log('hallo');
  },

  render() {
    return (
      <div className="home">
        <h1>Google Fu</h1>
        <button onClick={this._onClick}>Create a Private Game</button>
        <button>Join a Private Game</button>
        <button>Create a Public Game</button>
        <button>Join a Public Game</button>
      </div>
    )
  }
});
