import React from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div> 
        <Switch>
          <Route exact path="/covid-19" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
