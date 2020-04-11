import React from "react";
import { render } from "react-dom";
import Index from "./src/home.js";

const styles = {
  fontFamily: "sans-serif",
  backgroundColor: "#eee"
};

const App = () => (
  <div style={styles}>
    <Index />
  </div>
);

render(<App />, document.getElementById("root"));
