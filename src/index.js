// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.css'; // Import file chung Bootstrap CSS
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

