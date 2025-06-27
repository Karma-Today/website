import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async';
import { Web3Provider } from './components/Web3Provider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Web3Provider>
        <App />
      </Web3Provider>
    </HelmetProvider>
  </React.StrictMode>,
)
