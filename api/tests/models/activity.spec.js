const { Touristactivity, conn } = require('../../src/db.js');
const { expect } = require('chai');


describe('Tourist Activity model', () => {
    before(() => conn.authenticate()
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      }));

describe('Validators', () => {
    beforeEach(() => Touristactivity.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Touristactivity.create({
            difficulty: 3,
            duration: "30 minutes",
            season: "Summer",
           })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Touristactivity.create({
        name: "Testing Activity",
        difficulty: 3,
        duration: "30 minutes",
        season: "Summer",
       });
      });

      it('should throw an error if difficulty is bigger than 5', (done) => {
        Touristactivity.create({
            name: "Testing Activity",
            difficulty:6,
            duration: "30 minutes",
            season: "Summer",
           })
          .then(() => done(new Error('Difficulty must be between 1 and 5 ')))
          .catch(() => done());
      });

      it('should throw an error if season is not valid', (done) => {
        Touristactivity.create({
            name: "Testing Activity",
            difficulty:5,
            duration: "30 minutes",
            season: "asdad",
           })
          .then(() => done(new Error("Season must be 'Summer', 'Spring', 'Fall' or 'Winter'")))
          .catch(() => done());
      });



    });
  });
});