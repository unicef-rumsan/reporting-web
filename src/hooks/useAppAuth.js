//
import { useAppAuthContext } from '../contexts/AuthContext';
// import { AuthContext } from '../contexts/Auth0Context';
// import { AuthContext } from '../contexts/FirebaseContext';
// import { AuthContext } from '../contexts/AwsCognitoContext';

// ----------------------------------------------------------------------

const useAppAuth = () => {
  const context = useAppAuthContext();

  if (!context) throw new Error('Auth context must be use inside AuthProvider');

  return context;
};

export default useAppAuth;
