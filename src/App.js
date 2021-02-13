import React from 'react';
import { Header } from './components';
import { Home, Cart } from './pages';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route path="/Cart" component={Cart} exact /> 
        <Route path="/" component={Home} exact />{/*Путь / устанавливаем для компоненты Home и тд*. Exact допускает только точное совпадение маршрута со строкой запроса*/}
      </div>
    </div>
  );

}

export default App;



