'use strict';

/*global
  MochaWeb
  GoogleFu
  chai
*/

if (!(typeof MochaWeb === 'undefined')){

  MochaWeb.testOnly(function(){

    const urlEreg = /(([\w\.\-\+]+:)\/{2}(([\w\d\.]+):([\w\d\.]+))?@?(([a-zA-Z0-9\.\-_]+)(?::(\d{1,5}))?))?(\/(?:[a-zA-Z0-9\.\-\/\+\%]+)?)(?:\?([a-zA-Z0-9=%\-_\.\*&;]+))?(?:#([a-zA-Z0-9\-=,&%;\/\\"'\?]+)?)?/;
    let expect = chai.expect;

    describe('GoogleFu.Image', () => {

      describe('query(userip:String, query:String, cb(result:Array<StringID>))', () => {

        describe('query("node js");', () => {


          let node_js_results;
          before( done => {
            Meteor.call('GoogleFu.Image.query', Meteor.call('GoogleFu.IP.getAddress'), "node js", (err,result) => {
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
          it('should return the exact 4 results in order', () =>{

            expect(node_js_results[0]).to.be.equal('ANd9GcS9U7YpJZv9SgjH8wzmN2bqSUGs9Jmqe0tROoX54pRyDoeznmlUe5TMxw2A');
            expect(node_js_results[1]).to.be.equal('ANd9GcS2hbGAdokH5nfQgEZLjiLdTfRhBL0QfulkV1TvoGGVRomwkk5qYeLPXj0');
            expect(node_js_results[2]).to.be.equal('ANd9GcRjywSMf0DDvBI1paHhKcXQ91SxTZBe7kd48qLwC3KO2Z09S3kIXZpANQdU');
            expect(node_js_results[3]).to.be.equal('ANd9GcTy--ja2Cw-P68LpNitZ0C6RzH9R8SijWIgr13QJBc-nJ1iL4C4fkEt2w');

          });

        });

        describe('query("javascript");', () => {

          let javascript_results;
          before( done => {
            Meteor.call('GoogleFu.Image.query', Meteor.call('GoogleFu.IP.getAddress'), "javascript", (err,result) => {
              javascript_results = result;
              done();
            });
          });

          // this may fail if result change
          it('should return the exact 4 results in order', () =>{

            expect(javascript_results[0]).to.be.equal('ANd9GcReV5JLtAkhBg_8nb1X3Hwmgz79xD12Yho2EADgq0MyWz9N-qqza1lPb81z');
            expect(javascript_results[1]).to.be.equal('ANd9GcTHsSKvO6DGUWbJUdhAbbeepUMYpBjY2ipMmCCQCi1LTZXSatLZOiuSUMM');
            expect(javascript_results[2]).to.be.equal('ANd9GcT_WDc0_gJu8xDAIFNkq0v6y2dbivRAix3EwKjlMQs0vscc-hCQO56Q3n4');
            expect(javascript_results[3]).to.be.equal('ANd9GcS4hcJfxmETO_-rLIyeUlGelFTvzf_o4ogyPbq5oXclPXYp5I0mKC_1YEUC');

          });

        });
      });

      describe('queryThumbnails( query:String ):Array<StringURL> [static method]', () => {

        describe('queryThumbnails("node js");', () => {

          let node_js_results;
          before( done => {
            Meteor.call('GoogleFu.Image.queryThumbnails', Meteor.call('GoogleFu.IP.getAddress'), "node js", (err,result) => {
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
          it('should return the exact 4 results in order', () =>{

            expect(node_js_results[0]).to.be.equal('http://t1.gstatic.com/images?q=tbn:ANd9GcS9U7YpJZv9SgjH8wzmN2bqSUGs9Jmqe0tROoX54pRyDoeznmlUe5TMxw2A');
            expect(node_js_results[1]).to.be.equal('http://t1.gstatic.com/images?q=tbn:ANd9GcS2hbGAdokH5nfQgEZLjiLdTfRhBL0QfulkV1TvoGGVRomwkk5qYeLPXj0');
            expect(node_js_results[2]).to.be.equal('http://t1.gstatic.com/images?q=tbn:ANd9GcRjywSMf0DDvBI1paHhKcXQ91SxTZBe7kd48qLwC3KO2Z09S3kIXZpANQdU');
            expect(node_js_results[3]).to.be.equal('http://t1.gstatic.com/images?q=tbn:ANd9GcTy--ja2Cw-P68LpNitZ0C6RzH9R8SijWIgr13QJBc-nJ1iL4C4fkEt2w');

          });

        });

        describe('queryThumbnails("javascript");', () => {

          let javascript_results;
          before( done => {
            Meteor.call('GoogleFu.Image.queryThumbnails', Meteor.call('GoogleFu.IP.getAddress'), "javascript", (err,result) => {
              javascript_results = result;
              done();
            });
          });

          // this may fail if result change
          it('should return the exact 4 results in order', () =>{

            expect(javascript_results[0]).to.be.equal('http://t1.gstatic.com/images?q=tbn:ANd9GcReV5JLtAkhBg_8nb1X3Hwmgz79xD12Yho2EADgq0MyWz9N-qqza1lPb81z');
            expect(javascript_results[1]).to.be.equal('http://t1.gstatic.com/images?q=tbn:ANd9GcTHsSKvO6DGUWbJUdhAbbeepUMYpBjY2ipMmCCQCi1LTZXSatLZOiuSUMM');
            expect(javascript_results[2]).to.be.equal('http://t1.gstatic.com/images?q=tbn:ANd9GcT_WDc0_gJu8xDAIFNkq0v6y2dbivRAix3EwKjlMQs0vscc-hCQO56Q3n4');
            expect(javascript_results[3]).to.be.equal('http://t1.gstatic.com/images?q=tbn:ANd9GcS4hcJfxmETO_-rLIyeUlGelFTvzf_o4ogyPbq5oXclPXYp5I0mKC_1YEUC');

          });
        });

      });

      describe('getTop( query:String ):StringID [static method]', () => {

        describe('getTop("node js");', () => {

          let node_js_result;
          before(() => {
            node_js_result = GoogleFu.Image.getTop("node js");
          });

          it('should return a string', () => {
            expect(node_js_result).to.be.a('string');
          });

          // this may fail if result change
          it('should return the exact top result', () =>{
            expect(node_js_result).to.be.equal('ANd9GcRjywSMf0DDvBI1paHhKcXQ91SxTZBe7kd48qLwC3KO2Z09S3kIXZpANQdU');
          });

        });

        describe('getTop("javascript");', () => {

          let javascript_result;
          before(() => {
            javascript_result = GoogleFu.Image.getTop("javascript");
          });

          // this may fail if result change
          it('should return the exact top result', () =>{
            expect(javascript_result).to.be.equal('ANd9GcReV5JLtAkhBg_8nb1X3Hwmgz79xD12Yho2EADgq0MyWz9N-qqza1lPb81z');
          });
        });

      });

      describe('getTopThumbnail( query:String ):StringURL [static method]', () => {

        describe('getTopThumbnail("node js");', () => {

          let node_js_result;
          before(() => {
            node_js_result = GoogleFu.Image.getTopThumbnail("node js");
          });

          it('should return a string', () => {
            expect(node_js_result).to.be.a('string');
          });

          // this may fail if result change
          it('should return the exact top result', () =>{
            expect(node_js_result).to.be.equal('http://t1.gstatic.com/images?q=tbn:ANd9GcRjywSMf0DDvBI1paHhKcXQ91SxTZBe7kd48qLwC3KO2Z09S3kIXZpANQdU');
          });

        });

        describe('getTopThumbnail("javascript");', () => {

          let javascript_result;
          before(() => {
            javascript_result = GoogleFu.Image.getTopThumbnail("javascript");
          });

          // this may fail if result change
          it('should return the exact top result', () =>{
            expect(javascript_result).to.be.equal('http://t1.gstatic.com/images?q=tbn:ANd9GcReV5JLtAkhBg_8nb1X3Hwmgz79xD12Yho2EADgq0MyWz9N-qqza1lPb81z');
          });
        });

      });

    });
  });
}


