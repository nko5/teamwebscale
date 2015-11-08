Header = React.createClass({
  getInitialState() {
    return {
      title: this.props.title
    }
  },

  render() {
    return (
      <header>
        {this.state.title}
      </header>
    )
  }
})
