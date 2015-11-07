Games = {};

if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    before(function() {

    });

    describe("GoogleFu.GameController", function(){
      it("should create a new public game with single user", function(){
        let cursorSimulator;

        Games.insert = function(obj, done){
          expect(obj.title).toBe('');
        }

        expect(GoogleFu.GameController.createPublicGame()).toBe(cursorSimulator);
      });
    });
  });
}