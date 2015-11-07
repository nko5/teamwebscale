MainLayout = React.createClass({
  render() {
    let test = Meteor.settings.public.version;
    return (
      <div>
        <Header />
        <div className="container">
          {this.props.content}
        </div>
        <Footer />
      </div>
    )
  }
});
