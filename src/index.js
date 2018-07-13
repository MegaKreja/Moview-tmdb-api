import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import './index.css';
import Home from './components/Home';
import Movie from './components/Movie';
import registerServiceWorker from './registerServiceWorker';

// EXACT u buducnosti jos ruta kad se napravi komponenta za jedan film i glumce
const routes = (
  <BrowserRouter>
    <div>
      <Route exact={true} path="/" component={Home} />
      <Route path="/movie/:id" component={Movie} />
    </div>
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));
registerServiceWorker();