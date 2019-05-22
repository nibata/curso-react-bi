import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './redux/reducers'
import './index.css';
import HeroContainer from './containers/HeroContainer';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducers)

const ToRender = () => {
  return (
    <Provider store={store}>
      <HeroContainer />
    </Provider>
  )
}

ReactDOM.render(<ToRender />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
