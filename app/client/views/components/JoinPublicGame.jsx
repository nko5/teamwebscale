JoinPublicGame = React.createClass({
  _onClick() {
    console.log('hallo');
  },

  render() {
    return (
      <div className="home">
        <h1>Join Public Game</h1>
        <input name="name" />
        <h3>Choose A Room</h3>
      </div>
    )
  }
});
