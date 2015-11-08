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
        'ANd9GcTy--ja2Cw-P68LpNitZ0C6RzH9R8SijWIgr13QJBc-nJ1iL4C4fkEt2w'
      ];
      const valid_javascript_results = [
        'ANd9GcReV5JLtAkhBg_8nb1X3Hwmgz79xD12Yho2EADgq0MyWz9N-qqza1lPb81z',
        'ANd9GcTHsSKvO6DGUWbJUdhAbbeepUMYpBjY2ipMmCCQCi1LTZXSatLZOiuSUMM',
        'ANd9GcT_WDc0_gJu8xDAIFNkq0v6y2dbivRAix3EwKjlMQs0vscc-hCQO56Q3n4',
        'ANd9GcS4hcJfxmETO_-rLIyeUlGelFTvzf_o4ogyPbq5oXclPXYp5I0mKC_1YEUC'
      ];

      const valid_node_js_thumbnail_results = [
        'http://t1.gstatic.com/images?q=tbn:ANd9GcS9U7YpJZv9SgjH8wzmN2bqSUGs9Jmqe0tROoX54pRyDoeznmlUe5TMxw2A',
        'http://t1.gstatic.com/images?q=tbn:ANd9GcS2hbGAdokH5nfQgEZLjiLdTfRhBL0QfulkV1TvoGGVRomwkk5qYeLPXj0',
        'http://t1.gstatic.com/images?q=tbn:ANd9GcRjywSMf0DDvBI1paHhKcXQ91SxTZBe7kd48qLwC3KO2Z09S3kIXZpANQdU',
        'http://t1.gstatic.com/images?q=tbn:ANd9GcTy--ja2Cw-P68LpNitZ0C6RzH9R8SijWIgr13QJBc-nJ1iL4C4fkEt2w'
      ];

      const valid_javascript_thumbnail_results = [
        'http://t1.gstatic.com/images?q=tbn:ANd9GcReV5JLtAkhBg_8nb1X3Hwmgz79xD12Yho2EADgq0MyWz9N-qqza1lPb81z',
        'http://t1.gstatic.com/images?q=tbn:ANd9GcTHsSKvO6DGUWbJUdhAbbeepUMYpBjY2ipMmCCQCi1LTZXSatLZOiuSUMM',
        'http://t1.gstatic.com/images?q=tbn:ANd9GcT_WDc0_gJu8xDAIFNkq0v6y2dbivRAix3EwKjlMQs0vscc-hCQO56Q3n4',
        'http://t1.gstatic.com/images?q=tbn:ANd9GcS4hcJfxmETO_-rLIyeUlGelFTvzf_o4ogyPbq5oXclPXYp5I0mKC_1YEUC'
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

          // this may fail if result change
          it('should return the 4 results in any order', () =>{
            node_js_results.forEach(function(result){
              expect(valid_node_js_results).to.contain(result);
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

          // this may fail if result change
          it('should return the 4 results in any order', () =>{
            javascript_results.forEach(function(result){
              expect(valid_javascript_results).to.contain(result);
            });
          });

        });
      });

      describe('queryThumbnails( query:String ):Array<StringURL> [static method]', () => {

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

          it('should return 4 string urls', () => {
            expect(node_js_results).to.have.length(4);
            node_js_results.forEach(function(result){
              expect(result).to.be.a('string');
              expect(result).to.match(urlEreg);
            });
          });

          // this may fail if result change
          it('should return the 4 results in any order', () =>{
            node_js_results.forEach(function(result){
              expect(valid_node_js_thumbnail_results).to.contain(result);
            });
          });

        });

        describe('queryThumbnails("javascript");', () => {

          let javascript_results;
          before( done => {
            Meteor.call('GoogleFu.Image.queryThumbnails', userip, "javascript", (err,result) => {
              javascript_results = result;
              done();
            });
          });

          // this may fail if result change
          it('should return the results in any order', () =>{

            javascript_results.forEach(function(result){
              expect(valid_javascript_thumbnail_results).to.contain(result);
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

          // this may fail if result change
          it('should return the exact top result', () =>{
            expect(valid_javascript_results).to.contain(javascript_result);
          });
        });

      });

      describe('getTopThumbnail( query:String ):StringURL [static method]', () => {

        describe('getTopThumbnail("node js");', () => {

          let node_js_result;
          before( done => {
            Meteor.call('GoogleFu.Image.getTopThumbnail', userip, "node js", (err,result) => {
              node_js_result = result;
              done();
            });
          });

          it('should return a string', () => {
            expect(node_js_result).to.be.a('string');
          });

          // this may fail if result change
          it('should return the exact top result', () =>{
            expect(valid_node_js_thumbnail_results).to.contain(node_js_result)
          });

        });

        describe('getTopThumbnail("javascript");', () => {

          let javascript_result;
          before( done => {
            Meteor.call('GoogleFu.Image.getTopThumbnail', userip, "javascript", (err,result) => {
              javascript_result = result;
              done();
            });
          });

          // this may fail if result change
          it('should return the exact top result', () =>{
            expect(valid_javascript_thumbnail_results).to.contain(javascript_result);
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
            expect(giraffe_waffle_result).to.be.true();
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
            expect(node_js_result).to.true();
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
            expect(java_result).to.false();
          });
        });

      });

    });
  });
}


