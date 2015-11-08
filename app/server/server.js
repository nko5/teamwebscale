'use strict';

/*global
  GoogleFu,
  Meteor
*/
Meteor.methods({
  'GoogleFu.IP.getAddress' : GoogleFu.IP.getAddress,
  'GoogleFu.Image.query' : GoogleFu.Image.query,
  'GoogleFu.Image.queryThumbnails' : GoogleFu.Image.queryThumbnails,
  'GoogleFu.Image.getTop' : GoogleFu.Image.getTop,
  'GoogleFu.Image.getTopThumbnail' : GoogleFu.Image.getTopThumbnail,
  'GoogleFu.Image.match' : GoogleFu.Image.match,
});

