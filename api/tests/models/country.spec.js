const { Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Country.create({ id: "TST",
        name: "Testing Country",
        flagImage: "https://testing.svg",
        continent: "Test Continent",
        capital: "Tester",
       });
      });

      it('should throw an error if ID have more than 3 letters', (done) => {
        Country.create({ id: "TSTS",
        name: "Testing Country",
        flagImage: "https://testing.svg",
        continent: "Test Continent",
        capital: "Tester",
       })
          .then(() => done(new Error('It requires a 3 letters ID')))
          .catch(() => done());
      });


    });
  });
});
