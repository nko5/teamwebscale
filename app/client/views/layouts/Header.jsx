Header = React.createClass({
  _goHome() {
    FlowRouter.go('/');
  },

  render() {
    return (
      <header>
        {this.props.title}
        <a href="#" className="close-icon close-icon--right hide-text" onClick={this._goHome}>
          Close
        </a>
      </header>
    )
  }
})
