
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {getUrl} from './helper/urlHelper';

if (!sessionStorage.getItem("fetch")){
  sessionStorage.setItem("fetch", JSON.stringify({fetch: true}));
  fetch(`${getUrl()}/images/demo`, {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  }).then(rs => {
    let d = rs.json();
  });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
