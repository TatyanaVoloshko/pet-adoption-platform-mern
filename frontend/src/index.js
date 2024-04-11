import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PetsContextProvider } from "./context/PetsContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PetsContextProvider>
      <App />
    </PetsContextProvider>
  </React.StrictMode>
);

