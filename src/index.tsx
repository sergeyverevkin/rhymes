import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter, Route, Routes } from "react-router-dom";
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { LoginForm } from './pages/LoginForm';
import { Provider } from 'mobx-react';
import { LoginStore } from './store/loginStore';
import { RhymeStore } from './store/rhymeStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider loginStore={new LoginStore()} rhymeStore={new RhymeStore()}>
    <HashRouter>
      <Routes>
        <Route path="/" Component={App} />
        <Route path="/login" Component={LoginForm} />
      </Routes>
    </HashRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
