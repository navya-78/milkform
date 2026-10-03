import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";
import "./styles/splash.css";

function Splash() {
  return (
    <main className="splash-screen">
      <div className="splash-logo">🥛</div>
      <h1>Diary Farm</h1>
      <p>Fresh milk, delivered daily</p>
    </main>
  );
}

function AppContent() {
  const [showSplash, setShowSplash] = useState(
    () => window.location.pathname === "/",
  );

  useEffect(() => {
    if (!showSplash) return;

    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, [showSplash]);

  return showSplash ? <Splash /> : <AppRoutes />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}