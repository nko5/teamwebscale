'use strict';

/* global
  GoogleFu,
  Meteor
*/


GoogleFu.Query = (() => {

  const QUERIES = [
    'suspicious turtle',
    'gangster goose',
    'spongedog',
    'haircats',
    'dog swearing',
    'gay lion',
    'dird',
    'sad garbagei',
    'inflatable dinosaur heads',
    'scrotum backpack with hair',
    'not sure if',
    'unpopular opinion puffin'
  ];

  class Query {

    static random() {
      return QUERIES[ Math.floor(Math.random()*QUERIES.length) ];
    }

  }

  return Query;

})();
