import React from 'react';
import Home from './pages/home/Home'
import About from './pages/about/about'
import CharacterPage from './pages/character/character'
import Error404 from './pages/error404/error404'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/character/:id">
            <CharacterPage />
          </Route>
          <Route path="/*">
            <Error404 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

