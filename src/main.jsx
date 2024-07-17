import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

// Set axios untuk include CSRF Token di header
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
// if (token) {
//   axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
// } else {
//   console.error('CSRF token not found');
// }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
