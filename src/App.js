import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { fetchPizzas } from './redux/actions/pizzas';

import { Header } from './components';
import { Home, Cart } from './pages';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route path="/Cart" component={Cart} exact />
        <Route path="/" component={Home} exact />
      </div>
    </div>
  );

}

export default App;



