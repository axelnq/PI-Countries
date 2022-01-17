import React from "react";
import { MemoryRouter, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import Country from "./Country"


configure({ adapter: new Adapter() });

describe("<Country/>", () => {
  
  let countryCard, state, store, countries;
  const mockStore = configureStore([thunk]);
  countries = [
    {
        "id": "ATF",
        "name": "French Southern and Antarctic Lands",
        "flagImage": "https://flagcdn.com/tf.svg",
        "continent": "Antarctic",
        "capital": "Port-aux-Français",
        "subregion": null,
        "area": null,
        "population": 400,
        "createdAt": "2022-01-16T23:52:50.899Z",
        "updatedAt": "2022-01-16T23:52:50.899Z",
        "touristactivities": []
    },
    {
        "id": "COL",
        "name": "Colombia",
        "flagImage": "https://flagcdn.com/co.svg",
        "continent": "Americas",
        "capital": "Bogotá",
        "subregion": null,
        "area": null,
        "population": 50882884,
        "createdAt": "2022-01-16T23:52:50.899Z",
        "updatedAt": "2022-01-16T23:52:50.899Z",
        "touristactivities": []
    },
    {
        "id": "VEN",
        "name": "Venezuela",
        "flagImage": "https://flagcdn.com/ve.svg",
        "continent": "Americas",
        "capital": "Caracas",
        "subregion": null,
        "area": null,
        "population": 28435943,
        "createdAt": "2022-01-16T23:52:50.899Z",
        "updatedAt": "2022-01-16T23:52:50.899Z",
        "touristactivities": []
    },
    {
        "id": "TJK",
        "name": "Tajikistan",
        "flagImage": "https://flagcdn.com/tj.svg",
        "continent": "Asia",
        "capital": "Dushanbe",
        "subregion": null,
        "area": null,
        "population": 9537642,
        "createdAt": "2022-01-16T23:52:50.899Z",
        "updatedAt": "2022-01-16T23:52:50.899Z",
        "touristactivities": []
    },
  ]
  state = {
    countries: [],
    country: {},
  };
  store = mockStore(state);
 
  beforeEach(() => {
    countryCard = (country) =>
      mount(
        <Provider store={store}>
          <MemoryRouter>
            <Country
             key={country.id} id={country.id} name={country.name} image={country.flagImage} continent={country.continent}
            />
          </MemoryRouter>
        </Provider>
      );
    
  });

  afterEach(() => jest.restoreAllMocks());

  describe("Structure", () => {
    it('It should render an "img"', () => {
        expect(countryCard(countries[0]).find("img")).toHaveLength(1);
      });
    
    it('It should render an "h2" tag that shows what the "name" of each "Country"', () => {
      expect(countryCard(countries[0]).find("h2").at(0).text()).toBe("French Southern and Antarctic Lands");
      expect(countryCard(countries[1]).find("h2").at(0).text()).toBe(
        "Colombia"
      );
      expect(countryCard(countries[2]).find("h2").at(0).text()).toBe(
        "Venezuela"
      );
    });

    it('It should render an "h3" containing the text "Continent: " plus the continent of each "Country"', () => {
        expect(countryCard(countries[0]).find("h3").at(0).text()).toBe(
          "Continent: Antarctic"
        );
        expect(countryCard(countries[1]).find("h3").at(0).text()).toBe(
          "Continent: Americas"
        );
        expect(countryCard(countries[2]).find("h3").at(0).text()).toBe(
          "Continent: Americas"
        );
      });

      it('It should render a <Link> component that encloses each "Country" card and should redirect to "/detail/:countryID"', () => {
    
        expect(countryCard(countries[0]).find(Link)).toHaveLength(1);
        expect(countryCard(countries[0]).find(Link).at(0).prop("to")).toEqual(
          "/detail/ATF"
        );
      });

      


  });
});