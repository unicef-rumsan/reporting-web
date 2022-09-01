import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAppAuth';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
  component: PropTypes.any,
};

export default function GuestGuard({ component: Component, children, ...restProps }) {
  const { isAuthenticated, isInitialized } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return children ? <>{children}</> : <Component {...restProps} />;
}
