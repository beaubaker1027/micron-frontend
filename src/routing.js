import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Landing from "./components/landing/landing";
import Search from "./components/search/search";
import Info from "./components/info/info";
import About from "./components/about/about";

const Routing = (
  <Router>
    <div style={{ height: "100%", width: "100%" }}>
      <Route exact path="/" component={Search} />
      <Route path="/info/:id" component={Info} />
      <Route path="/about" component={About} />
    </div>
  </Router>
);

export default Routing;
