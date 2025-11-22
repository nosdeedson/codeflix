import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { setupStore } from './app/store';
import { BrowserRouter } from "react-router-dom";
import { KeycloakProvider } from './providers/KeycloakProviders';
import { KeycloakProviderV2 } from './providers/KeycloakProvidersV2';

const container = document.getElementById('root')!;
const root = createRoot(container);
const store = setupStore()

root.render(
  <Provider store={store}>
        <KeycloakProviderV2>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
        </KeycloakProviderV2>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
