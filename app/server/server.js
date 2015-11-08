Meteor.methods({
  queryImages : (q) => {
    return GoogleFu.Image.query( GoogleFu.IP.getAddress(), q);
  }
});

