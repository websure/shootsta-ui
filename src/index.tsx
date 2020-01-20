import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router
  } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'

function Base() {
    return (
      <Router>
      <div className="App">    
          <App />
      </div>
        </Router>
    );
  }

ReactDOM.render(<Base />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
