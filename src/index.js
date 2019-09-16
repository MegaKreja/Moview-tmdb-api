import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';
import './index.css';
import Home from './components/Home/Home';
import Movie from './components/Movie/Movie';
import Actor from './components/Actor/Actor';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ResetPassword from './components/ResetPassword/ResetPassword';
import EditProfile from './components/EditProfile/EditProfile';
import FavoriteMovies from './components/FavoriteMovies/FavoriteMovies';
import Watchlist from './components/Watchlist/Watchlist';

// EXACT u buducnosti jos ruta kad se napravi komponenta za jedan film i glumce
const routes = (
  <BrowserRouter>
    <ScrollToTop>
      <div>
        <Switch>
          <Route exact={true} path='/' component={Home} />
          <Route path='/movie/:id' component={Movie} />
          <Route path='/actor/:id' component={Actor} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/login/forgottenpassword' component={ResetPassword} />
          <Route path='/edit/:username' component={EditProfile} />
          <Route path='/:username/favorite' component={FavoriteMovies} />
          <Route path='/:username/watchlist' component={Watchlist} />
          <Route render={() => <Redirect to='/' />} />
        </Switch>
      </div>
    </ScrollToTop>
  </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('app'));
