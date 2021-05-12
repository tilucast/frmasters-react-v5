import React, { lazy, Suspense, useState } from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams";
import { Router } from "@reach/router";
import ThemeContext from "./ThemeContext";
import Navbar from "./Navbar";
import {} from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import store from "./store";

const Details = lazy(() => import("./Details"));

const App = () => {
  const themeHook = useState("peru");

  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeContext.Provider value={themeHook}>
          <div>
            <Navbar />
            <Suspense fallback={<h1>Loading ...</h1>}>
              <Router>
                <SearchParams path="/" />
                <Details path="/details/:id" />
              </Router>
            </Suspense>
          </div>
        </ThemeContext.Provider>
      </Provider>
    </React.StrictMode>
  );
};

export default App;

render(<App />, document.getElementById("root"));
