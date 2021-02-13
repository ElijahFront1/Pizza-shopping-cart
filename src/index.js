import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './scss/app.scss';
import App from './App';

ReactDOM.render( //Рендерим содержимое с помощью ReactDOM.render(содержимое)
   <Router> {/*Router определяет набор маршрутов и, когда к приложению, приходит запрос, то Router выполняет сопоставление запроса с маршрутами. Вся движуха с рутами в App*/}
    <Provider store={store}> {/*Provider позволяет получиь доступ к store из любого компонента вложенного Provider и любого из его дочерних компонентов*/}
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
