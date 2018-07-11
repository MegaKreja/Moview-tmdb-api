import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// EXACT u buducnosti jos ruta kad se napravi komponenta za jedan film i glumce
const routes = (
  <BrowserRouter>
    <div>
      <Route path="/" component={App} exact/>
    </div>
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));
registerServiceWorker();