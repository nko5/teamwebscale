'use strict';

let mocha = require('mocha');
let Code = require('code');
let expect = Code.expect;

let GoogleImages = require('../../../common/googleImages.js');

describe('GoogleImages', () => {

  describe('query( query:String ):Array<StringID> [static method]', () => {

    describe('query("node js");', () => {

      let node_js_results;
      before(() => {
        node_js_results = GoogleImages.query("node js");
      });

      it('should return an array', () => {
        expect(node_js_results).to.be.an.instanceof(Array);
      });

      it('should return 4 string ids', () => {
        expect(node_js_results).to.have.length(4);
        expect(node_js_results[0]).to.be.an.instanceof(String);
      });

      // this may fail if result change
      it('should return the exact 4 results in order', () =>{

        expect(node_js_results[0]).to.be.equal('ANd9GcRjywSMf0DDvBI1paHhKcXQ91SxTZBe7kd48qLwC3KO2Z09S3kIXZpANQdU');
        expect(node_js_results[1]).to.be.equal('ANd9GcS9U7YpJZv9SgjH8wzmN2bqSUGs9Jmqe0tROoX54pRyDoeznmlUe5TMxw2A');
        expect(node_js_results[2]).to.be.equal('ANd9GcTy--ja2Cw-P68LpNitZ0C6RzH9R8SijWIgr13QJBc-nJ1iL4C4fkEt2w');
        expect(node_js_results[3]).to.be.equal('ANd9GcS53G41Q6xj6SV_-qxkN6jltfmhern9xJ4z_TmiQ2AvDIayuZv5LRsgU2w');

      });

    });

    describe('query("javascript");', () => {

      let javascript_results;
      before(() => {
        javascript_results = GoogleImages.query("javascript");
      });

      // this may fail if result change
      it('should return the exact 4 results in order', () =>{

        expect(javascript_results[0]).to.be.equal('ANd9GcReV5JLtAkhBg_8nb1X3Hwmgz79xD12Yho2EADgq0MyWz9N-qqza1lPb81z');
        expect(javascript_results[1]).to.be.equal('ANd9GcTHsSKvO6DGUWbJUdhAbbeepUMYpBjY2ipMmCCQCi1LTZXSatLZOiuSUMM');
        expect(javascript_results[2]).to.be.equal('ANd9GcS4hcJfxmETO_-rLIyeUlGelFTvzf_o4ogyPbq5oXclPXYp5I0mKC_1YEUC');
        expect(javascript_results[3]).to.be.equal('ANd9GcT_WDc0_gJu8xDAIFNkq0v6y2dbivRAix3EwKjlMQs0vscc-hCQO56Q3n4');

      });

    });
  });
});
