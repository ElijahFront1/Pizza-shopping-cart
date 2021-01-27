import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { setPizzas as setPizzasAction } from './redux/actions/pizzas';

import { Header } from './components';
import { Home, Cart } from './pages';
import { Route } from 'react-router-dom';

class App extends React.Component {

  componentDidMount() {
    axios.get('http://localhost:3000/db.json').then(({ data }) => {
      this.props.setPizzas(data.pizzas)
    })
  }

  render() {
    return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <Route path="/Cart" component={Cart} exact />
          <Route path="/" render={() => <Home items={this.props.items} />} exact />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.pizzas.items,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    setPizzas: (items) => dispatch(setPizzasAction(items)),
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App); 