import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import GlobalStyles from './styles/GlobalStyles';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Landing from './pages/Landing';
import PropTypes from 'prop-types';
import SavedImagesPage from './pages/SavedImagesPage';

const AuthenticatedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  
  if (!user) {
    return <Navigate to="/signin" />;
  }

  return children;
};

AuthenticatedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/app" element={<AppLayout />} />
          <Route
            path="/dashboard"
            element={
              <AuthenticatedRoute>
                <AppLayout />
              </AuthenticatedRoute>
            }
          />
          <Route path="/saved-images" element={<SavedImagesPage />} />
        </Routes>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000
            },
            error: {
              duration: 4000
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
            }
          }}
        />
      </AuthProvider>
    </Router>
  );
}

export default App;
