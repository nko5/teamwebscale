'use strict';

let mocha = require('mocha');
let Code = require('code');
let expect = Code.expect;

let GoogleImages = require('../lib/google_images.js');

describe('GoogleImages', () => {

  describe('query( query:String, count:Int ):Array<Url> [static method]', () => {

    describe('query("node js", 10);', () => {

      let ten_node_js;
      before(() => {
        ten_node_js = GoogleImages.query("node js", 10);
      });

      it('should return an array', () => {
        expect(ten_node_js).to.be.an.instanceof(Array);
      });

      it('should return 10 strings', () => {
        expect(ten_node_js).to.have.length(10);
        expect(ten_node_js[0]).to.be.an.instanceof(String);
      });

    });
  });
});
