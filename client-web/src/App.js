import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';

import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Router from './router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(ReduxThunk)));

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        </Provider>
    );
  }
}

//axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')?localStorage.getItem('token'): '';
export default App;
