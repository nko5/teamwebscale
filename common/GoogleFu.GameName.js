'use strict';

/* global
  GoogleFu,
  Meteor
*/


GoogleFu.GameName = (() => {

  const OOGLE = 'oogle';

  const OOGLES = [
    'Ab', 'Az', 'Bl', 'Br', 'Cl', 'Cr', 'Dr', 'Dw', 'Ef', 'Er', 'Fl',
    'Fr', 'Gl', 'Gr', 'Ha', 'Ho', 'Il', 'Im', 'Ja', 'Jo', 'Kl', 'Kw',
    'Le', 'Lo', 'Mr', 'Ma', 'Ni', 'Na', 'Oo', 'Og', 'Pr', 'Pl', 'Qu',
    'Qo', 'Ra', 'Ri', 'Sl', 'Sr', 'To', 'Tr', 'Ul', 'Um', 'Vr', 'Vl',
    'Wr', 'Wa', 'Xo', 'Xe', 'Ya', 'Ye', 'Zr', 'Zm' ];

  const ANIMALS = [
    'Albatross', 'Bandicoot', 'Chinchilla', 'Donkey', 'Earwig',
    'Flounder', 'Goose', 'Hyena', 'Impala', 'Jaguar',
    'Koala', 'Lemur', 'Macaw', 'Newt', 'Opossum',
    'Platypus', 'Quokka', 'Rhinoceros', 'Stingray', 'Termite',
    'Uakari', 'Vulture', 'Walrus', 'XrayFish', 'Yak', 'Zebra' ];

  class GameName {

    /*
     * generate( ):{ code : String, name : String  }
     *
     * returns object with code and name
     *
     */
    static generate(){

      let randomOogle = OOGLES[Math.floor(Math.random()*OOGLES.length)];
      let randomAnimal = ANIMALS[Math.floor(Math.random()*ANIMALS.length)];

      return {
        code : randomOogle.toUpperCase()+randomAnimal[0].toUpperCase(),
        name : `${randomOogle}${OOGLE} ${randomAnimal}`
      };

    }

  }

  return GameName;

})();
