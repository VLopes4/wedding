import React from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { CartProvider } from './contexts/cart';
import { AuthProvider } from './contexts/auth';
import { LoadProvider } from './contexts/load';
import Routes from './routes/index.routes';
import env from './config/environments';

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <PayPalScriptProvider options={env.paypal}>
          <LoadProvider>
            <Routes/>
          </LoadProvider>
        </PayPalScriptProvider>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;
