import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/hooks/use-auth';
import { CartProvider } from '@/hooks/use-cart';
import { LocationGate } from '@/components/LocationGate';
import { Header } from '@/components/layout/header';
import { HomePage } from '@/pages/home';
import { ServicesPage } from '@/pages/services';
import { ProductsPage } from '@/pages/products';
import { CartPage } from '@/pages/cart';
import { SignUpPage } from '@/pages/signup';
import { SignInPage } from '@/pages/signin';
import { ContactPage } from '@/pages/contact';
import { PaymentSuccessPage } from '@/pages/payment/success';
import { PaymentFailedPage } from '@/pages/payment/failed';
import { PaymentCallbackPage } from '@/pages/payment/callback';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <LocationGate>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/payment/success" element={<PaymentSuccessPage />} />
                <Route path="/payment/failed" element={<PaymentFailedPage />} />
                <Route path="/payment/callback" element={<PaymentCallbackPage />} />
              </Routes>
              <Toaster position="top-right" />
            </div>
          </Router>
        </LocationGate>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;