import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import ScrollToTop from 'react-router-scroll-top';
import './index.css';
import Home from './components/Home';
import Movie from './components/Movie';
import Actor from "./components/Actor";
import registerServiceWorker from './registerServiceWorker';

// EXACT u buducnosti jos ruta kad se napravi komponenta za jedan film i glumce
const routes = (
  <BrowserRouter>
    <ScrollToTop>
      <div>
        <Route exact={true} path="/" component={Home} />
        <Route path="/movie/:id" component={Movie} />
        <Route path="/actor/:id" component={Actor} />
      </div>
    </ScrollToTop>
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));
registerServiceWorker();