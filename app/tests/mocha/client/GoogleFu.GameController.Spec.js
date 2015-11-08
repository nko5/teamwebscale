var Games = {};

if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    let expect = chai.expect;

    describe("GoogleFu.GameController", () => {
      it("should create a new public game with single user", () => {
        // let cursorSimulator = (err, result) => {}

        Games.insert = (obj, done) => {
          expect(obj.title).to.be.equal('Ooogle Octupus');
          expect(obj.type).to.be.equal(1);
          expect(obj.code).to.be.a('null');
          expect(obj.players).to.be.a('array');
          expect(obj.players).to.have.length(1);
          return cursorSimulator;
        }

        GoogleFu.GameController.createPublicGame();
      });

      it("should create a new private game with single user and generate a unique room code", () => {
        // let cursorSimulator = (err, result) => {}

        Games.insert = (obj, done) => {
          expect(obj.title).to.be.equal('Ooogle Octupus');
          expect(obj.type).to.be.equal(0);
          expect(obj.code).to.be.a('string');
          expect(obj.players).to.be.a('array');
          expect(obj.players).to.have.length(1);
          return cursorSimulator;
        }

        // expect(GoogleFu.GameController.createPrivateGame()).to.deep.equal(cursorSimulator);
        GoogleFu.GameController.createPrivateGame();
      });
    });
  });
}