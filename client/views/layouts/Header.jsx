Header = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      title: Session.get('title')
    };
  },
  _goHome() {
    FlowRouter.go('/');
  },

  render() {
    let title = this.data.title || this.props.title;
    return (
      <header>
        {title}
        <a href="#" className="close-icon close-icon--right hide-text" onClick={this._goHome}>
          Close
        </a>
      </header>
    )
  }
})
