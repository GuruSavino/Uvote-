// src/utils/auth.js
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("uvote_token", token);
  } else {
    localStorage.removeItem("uvote_token");
  }
};

export const getAuthToken = () => {
  return localStorage.getItem("uvote_token");
};

export const isAuthenticated = () => {
  const token = getAuthToken();
  if (!token) return false;

  // In a real app, you would verify the token's expiration here
  // For now, we'll just check if it exists
  return true;
};

export const logout = () => {
  localStorage.removeItem("uvote_token");
  // Redirect to login page
  window.location.href = "/login";
};
