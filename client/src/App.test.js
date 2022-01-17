
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { createStore, applyMiddleware } from 'redux';

import App from "./App";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Detail from "./components/Detail";
import CreateActivity from "./components/CreateActivity";


configure({ adapter: new Adapter() });  

describe("<App />", () => {
  let store;
  const routes = ["/", "/home", "/detail/:id", "/createActivity"];
  const mockStore = configureStore([thunk]);
  const state = {
    countries: []
  };

  beforeEach(() => {
    store = mockStore(state);
  });

  const componentToUse = (route) => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  };

  describe("Routes", () => {
    it('Landing page debería ser renderizado en la ruta "/"', () => {
      const app = mount(componentToUse(routes[0]));
      expect(app.find(LandingPage)).toHaveLength(1);
    });
    /*
    xit('Landing page no debería ser renderizado en la ruta "/home"', () => {
      const app = mount(componentToUse(routes[1]));
      expect(app.find(LandingPage)).toHaveLength(0);
    });

    xit('Home debería ser renderizado en la ruta "/home"', () => {
      const app = mount(componentToUse(routes[1]));
      expect(app.find(Home)).toHaveLength(1);
    });

    xit('CreateActivity debería ser renderizado en la ruta "/createActivity"', () => {
      const app = mount(componentToUse(routes[3]));
      expect(app.find(CreateActivity)).toHaveLength(1);
    });
    */
  });

  

  
});

