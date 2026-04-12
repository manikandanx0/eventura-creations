import { Navigate, useLocation } from 'react-router-dom';
import { Loader, Stack, Text } from '@mantine/core';
import { useAuth } from '../context/AuthContext.jsx';

/**
 * Guards client routes that require a logged-in user (JWT present + `/api/auth/me` succeeded).
 */
export default function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <section className="projects-section">
        <div className="container">
          <Stack align="center" py="xl">
            <Loader color="grape" type="dots" />
            <Text c="dimmed">Checking session…</Text>
          </Stack>
        </div>
      </section>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
