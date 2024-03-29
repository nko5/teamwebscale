'use strict';

/*global
  Meteor,
  MochaWeb,
  GoogleFu,
  chai
*/

if (!(typeof MochaWeb === 'undefined')){

  MochaWeb.testOnly(function(){

    const urlEreg = /(([\w\.\-\+]+:)\/{2}(([\w\d\.]+):([\w\d\.]+))?@?(([a-zA-Z0-9\.\-_]+)(?::(\d{1,5}))?))?(\/(?:[a-zA-Z0-9\.\-\/\+\%]+)?)(?:\?([a-zA-Z0-9=%\-_\.\*&;]+))?(?:#([a-zA-Z0-9\-=,&%;\/\\"'\?]+)?)?/;
    let expect = chai.expect;

    describe('GoogleFu.Image', () => {

      let userip;
      before( () => {
        userip = Meteor.call('GoogleFu.IP.getAddress');
      });
      const valid_node_js_results = [
        'ANd9GcS9U7YpJZv9SgjH8wzmN2bqSUGs9Jmqe0tROoX54pRyDoeznmlUe5TMxw2A',
        'ANd9GcS2hbGAdokH5nfQgEZLjiLdTfRhBL0QfulkV1TvoGGVRomwkk5qYeLPXj0',
        'ANd9GcRjywSMf0DDvBI1paHhKcXQ91SxTZBe7kd48qLwC3KO2Z09S3kIXZpANQdU',
        'ANd9GcTy--ja2Cw-P68LpNitZ0C6RzH9R8SijWIgr13QJBc-nJ1iL4C4fkEt2w',
        'ANd9GcS2hbGAdokH5nfQgEZLjiLdTfRhBL0QfulkV1TvoGGVRomwkk5qYeLPXj0'
      ];
      const valid_javascript_results = [
        'ANd9GcReV5JLtAkhBg_8nb1X3Hwmgz79xD12Yho2EADgq0MyWz9N-qqza1lPb81z',
        'ANd9GcTHsSKvO6DGUWbJUdhAbbeepUMYpBjY2ipMmCCQCi1LTZXSatLZOiuSUMM',
        'ANd9GcT_WDc0_gJu8xDAIFNkq0v6y2dbivRAix3EwKjlMQs0vscc-hCQO56Q3n4',
        'ANd9GcS4hcJfxmETO_-rLIyeUlGelFTvzf_o4ogyPbq5oXclPXYp5I0mKC_1YEUC',
        'ANd9GcTln9UztmWu2VtgsjdUGT_AkFh_jf83l4Y7CJMR0iVJxjrd9DsvAuHFZQ'
      ];

      describe('query(userip:String, query:String, cb(result:Array<StringID>))', () => {

        describe('query("node js");', () => {


          let node_js_results;
          before( done => {
            Meteor.call('GoogleFu.Image.query', userip, "node js", (err,result) => {
              node_js_results = result;
              done();
            });
          });

          it('should return an array', () => {
            expect(node_js_results).to.be.an.instanceof(Array);
          });

          it('should return 4 string ids', () => {
            expect(node_js_results).to.have.length(4);
            node_js_results.forEach(function(result){
              expect(result).to.be.a('string');
            });
          });

        });

        describe('query("javascript");', () => {

          let javascript_results;
          before( done => {
            Meteor.call('GoogleFu.Image.query', userip, "javascript", (err,result) => {
              javascript_results = result;
              done();
            });
          });

        });
      });

      describe('queryThumbnails( query:String ):Array<Image> [static method]', () => {

        describe('queryThumbnails("node js");', () => {

          let node_js_results;
          before( done => {
            Meteor.call('GoogleFu.Image.queryThumbnails', userip, "node js", (err,result) => {
              node_js_results = result;
              done();
            });
          });

          it('should return an array', () => {
            expect(node_js_results).to.be.an.instanceof(Array);
          });

          it('should return 4 Image objects', () => {
            expect(node_js_results).to.have.length(4);
            node_js_results.forEach(function(result){
              expect(result).to.be.an('object');
              expect(result).to.have.property('url');
              expect(result).to.have.property('dimensions');
              expect(result.url).to.match(urlEreg);
            });
          });

        });

      });

      describe('getTop( query:String ):StringID [static method]', () => {

        describe('getTop("node js");', () => {

          let node_js_result;
          before( done => {
            Meteor.call('GoogleFu.Image.getTop', userip, "node js", (err,result) => {
              node_js_result = result;
              done();
            });
          });

          it('should return a string', () => {
            expect(node_js_result).to.be.a('string');
          });

          // this may fail if result change
          it('should return an image within the top 4', () =>{
            expect(valid_node_js_results).to.contain(node_js_result);
          });

        });

        describe('getTop("javascript");', () => {

          let javascript_result;
          before(() => {
            Meteor.call('GoogleFu.Image.getTop', userip, "javascript", (err,result) => {
              javascript_result = result;
              done();
            });
          });
        });

      });

      describe('getTopThumbnail( query:String ):Image [static method]', () => {

        describe('getTopThumbnail("node js");', () => {

          let node_js_result;
          before( done => {
            Meteor.call('GoogleFu.Image.getTopThumbnail', userip, "node js", (err,result) => {
              node_js_result = result;
              done();
            });
          });

          it('should return an Image object', () => {
            expect(node_js_result).to.be.an('object');
            expect(node_js_result).to.have.property('url');
            expect(node_js_result).to.have.property('dimensions');
          });

        });

      });


      describe('match( answer:String, guess:String ):Bool [static method]', () => {

        describe('match("giraffe waffle", "waffle iron giraffe");', () => {

          let giraffe_waffle_result;
          before( done => {
            Meteor.call('GoogleFu.Image.match', userip, "giraffe waffle", "waffle iron giraffe", (err,result) => {
              giraffe_waffle_result = result;
              done();
            });
          });

          it('should return a Boolean', () => {
            expect(giraffe_waffle_result).to.be.a('boolean');
          });

          // this may fail if result change
          it('should return true for similar matching queries', () =>{
            expect(giraffe_waffle_result).to.be.true;
          });

        });

        describe('match("node js","nodejs");', () => {

          let node_js_result;
          before(() => {
            Meteor.call('GoogleFu.Image.match', userip, "node js", "nodejs", (err,result) => {
              node_js_result = result;
              done();
            });
          });

          // this may fail if result change
          it('should return true for similar matching queries', () =>{
            expect(node_js_result).to.be.true;
          });
        });

        describe('match("java","javascript");', () => {

          let java_result;
          before(() => {
            Meteor.call('GoogleFu.Image.match', userip, "java", "javascript", (err,result) => {
              java_result = result;
              done();
            });
          });

          // this may fail if result change
          it('should return false for mismatching queries', () =>{
            expect(java_result).to.be.false;
          });
        });

      });

    });
  });
}


