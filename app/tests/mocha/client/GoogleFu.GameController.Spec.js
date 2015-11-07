Games = {};

if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    let expect = chai.expect;

    before(function() {

    });

    describe("GoogleFu.GameController", () => {
      it("should create a new public game with single user", function(){
        let cursorSimulator = function(err, result){}

        Games.insert = function(obj, done){
          expect(obj.title).to.be.equal('Ooogle Octupus');
          expect(obj.type).to.be.equal(1);
          expect(obj.code).to.be.a('null');
          expect(obj.players).to.be.a('array');
          return cursorSimulator;
        }

        expect(GoogleFu.GameController.createPublicGame()).to.deep.equal(cursorSimulator);
      });
    });
  });
}