import React, { lazy, Suspense, useState } from "react";
import { render } from "react-dom";
import SearchParams from "./SearchParams";
import { Router } from "@reach/router";
import ThemeContext from "./ThemeContext";
import Navbar from "./Navbar";

const Details = lazy(() => import("./Details.tsx"));

const App = () => {
  const themeHook = useState("darkblue");

  return (
    <React.StrictMode>
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
    </React.StrictMode>
  );
};

export default App;

render(<App />, document.getElementById("root"));
