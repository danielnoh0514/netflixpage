import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import { latest } from "./utils";

function App() {
  const latestMovie = useRecoilValue(latest);
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={"/tv"}>
          <Tv />
        </Route>
        <Route path={"/search"}>
          <Search />
        </Route>
        <Route path={["/", "/movies/:movieId"]}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
