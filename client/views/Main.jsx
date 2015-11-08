MainLayout = React.createClass({
  render() {
    let header;

    if (this.props.title) {
      header = <Header title={this.props.title} />
    }

    return (
      <div className="main">
        {header}
        {this.props.content}
      </div>
    )
  }
});
