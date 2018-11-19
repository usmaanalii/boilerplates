import '@babel/polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import style from "./style.css"

const NavList = styled.ul`
  list-style: none;
   & > li {
     display: inline;
      &:not(first-child) {
        margin-left: 1rem;
      }
   }
`;

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function App1() {
  return (
    <div>
      <h2>App1</h2>
    </div>
  );
}

function App2({ match }) {
  return (
    <div>
      <h2>App2</h2>
      <ul>
        <li>
          <Link to={`${match.url}/sub-link-1`}>Sub link 1</Link>
        </li>
        <li>
          <Link to={`${match.url}/sub-link-2`}>Sub Link 2</Link>
        </li>
        <li>
          <Link to={`${match.url}/sub-link-3`}>Sub Link 3</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:topicId`} component={SubLink} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

function SubLink({ match }) {
  return (
    <div>
      <h3>match.param,topicId === {match.params.topicId}</h3>
      <p>
        {JSON.stringify(match)}
      </p>
    </div>
  );
}


function BasicExample() {
  return (
    <Router>
      <div>
        <NavList>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/app1">App1</Link>
          </li>
          <li>
            <Link to="/app2">App2</Link>
          </li>
        </NavList>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/app1" component={App1} />
        <Route path="/app2" component={App2} />
      </div>
    </Router>
  );
}

ReactDOM.render(<BasicExample />, document.getElementById("index"));
