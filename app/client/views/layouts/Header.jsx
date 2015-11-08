Header = React.createClass({
  getInitialState() {
    return {
      title: this.props.title
    }
  },

  _goHome() {
    FlowRouter.go('/');
  },

  render() {
    return (
      <header>
        {this.state.title}
        <a href="#" className="close-icon hide-text" onClick={this._goHome}>
          Close
        </a>
      </header>
    )
  }
})
