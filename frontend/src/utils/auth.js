// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// Get stored token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Set token
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// Remove token
export const removeToken = () => {
  localStorage.removeItem("token");
};
