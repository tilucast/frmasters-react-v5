import React from "react";
import { render } from "react-dom";
import { Pet } from "./Pet";

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopt Me!"),
    React.createElement(Pet, { name: "Pinho", animal: "Cat", breed: "Unkown" }),
    React.createElement(Pet, { name: "Luma", animal: "Dog", breed: "Unknown" }),
    React.createElement(Pet, { name: "Zega", animal: "Cat", breed: "Unknown" }),
  ]);
};

render(React.createElement(App), document.getElementById("root"));
