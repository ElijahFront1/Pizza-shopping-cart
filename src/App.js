import React from 'react';
import { Route } from 'react-router-dom';

import { Header } from './components';
import { Home, Cart } from './pages';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route path="/Cart" component={Cart} exact/>
        <Route path="/" component={Home} exact/>
      </div>
    </div>
  );
}

export default App;