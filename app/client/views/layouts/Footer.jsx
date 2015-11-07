Footer = React.createClass({
  render() {
    let version = Meteor.settings.public.version;
    return (
      <div className="footer">
        <p>Footer {version}</p>
      </div>
    )
  }
});

