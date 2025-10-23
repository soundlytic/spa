import './App.css'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage from './pages/auth/Login'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignupPage from './pages/auth/Signup';
import SonPage from './pages/Songs';
import Layout from './pages/layout/Layout';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="w-screen">
          <Routes>
            <Route
              path="/songs"
              element={
                <PrivateRoute>
                  <SonPage />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}
export default App
