/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country =   {
    id: "ATF",
  name: "French Southern and Antarctic Lands",
  flagImage: "https://flagcdn.com/tf.svg",
  continent: "Antarctic",
  capital: "Port-aux-Français",
  subregion: null,
  area: null,
  population: 400
 
}

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create(country)));


  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/api/countries').expect(200)
    );
  });

  describe('GET /countries with query', () => {
    it('Search the country that match with the query', () =>
      agent.get('/api/countries?name=French Southern and Antarctic Lands')
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(res => {
        expect(res.body[0].capital).equal("Port-aux-Français")
      })
    );

    it("If the country name  passed by query doesn't match , it returns a message 'This country doesn't exist'", () =>
    agent.get('/api/countries?name=asdasd')
    .expect(404)
    .expect("Content-Type", /json/)
    .expect(res => {
      expect(res.body).to.deep.equal({"message":"This country doesn't exist."})
    })
  );
  });

  describe('GET /countries/:idPais with query', () => {
    it('Get the detail of a country searching by ID', () =>
      agent.get('/api/countries/ATF')
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(res => {
        expect(res.body.id).equal("ATF")
      })
    );
  });
});
