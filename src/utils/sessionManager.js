import jwtDecode from 'jwt-decode';

export const getCurrentUser = () => {
  let user = null;
  const data = localStorage.getItem('currentUser');
  if (data) user = JSON.parse(data);
  return user;
};

export const saveCurrentUser = (userData) => localStorage.setItem('currentUser', JSON.stringify(userData));

export const getAccessToken = () => localStorage.getItem('accessToken');

export const saveAccessToken = (accessToken) => localStorage.setItem('accessToken', accessToken);

export const deleteAccessToken = () => localStorage.removeItem('accessToken');

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};
