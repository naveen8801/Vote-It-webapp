import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Create_Poll from './pages/Create_Poll';
import Getpoll from './pages/Getpoll';
import AboutUs from './pages/AboutUs';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="w-full h-screen">
        <div className="h-16 w-full bg-gray-800 flex items-center">
          <div className="container mx-auto px-5">
            <Link
              to="/"
              className="text-white cursor-pointer hover:text-gray-400 transition duration-150 mr-10"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white cursor-pointer hover:text-gray-400 transition duration-150 mr-10"
            >
              About Us
            </Link>
            <Link
              to="/create"
              className="text-white cursor-pointer hover:text-gray-400 transition duration-150 mr-10"
            >
              Create Poll
            </Link>
          </div>
        </div>

        <Switch>
          <Route path="/create">
            <Create_Poll />
          </Route>
          <Route
            path="/polls/:poll"
            render={(props) => <Getpoll props={props} />}
          />
          <Route path="/about">
            <AboutUs />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
