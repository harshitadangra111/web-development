import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/layout/CartDrawer';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen bg-background text-on-surface">
            {/* Top Fixed Artisanal Header */}
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-1 pt-20">
              <AppRoutes />
            </main>

            {/* Sliding Ambient Order Tray Drawer */}
            <CartDrawer />

            {/* Roastery Footer */}
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
