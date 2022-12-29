import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Components/Header';
import Home from './Components/Home';
// import LandingPage  from './Components/LandingPage/index'
// import Companies from './Components/Companies/layout';
import Jobs from './Components/Jobs/layout';
import Connections from './Components/Connections/layout';
import Companies from './Components/Companies/layout';
import ErrorPage from './Components/Jobs/error-page';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Store/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
      >
        <BrowserRouter>

          <Header />

          <Routes>

            <Route default path="/" element={<Home />} errorElement={<ErrorPage />} />
            <Route default path="/Companies" element={<Companies />} errorElement={<ErrorPage />} />
            <Route default path="/Jobs" element={<Jobs />} errorElement={<ErrorPage />} />
            <Route default path="/Connections" element={<Connections />} errorElement={<ErrorPage />} />

          </Routes>

        </BrowserRouter>

      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);
