const AUTH_KEY = 'iptv_admin_auth';
const PASSWORD_KEY = 'iptv_admin_password';
const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = 'admin123';

function getStoredPassword() {
  return localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
}

function login(username, password) {
  const storedPassword = getStoredPassword();
  if (username === DEFAULT_USERNAME && password === storedPassword) {
    const authData = {
      username: username,
      timestamp: new Date().getTime()
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    return true;
  }
  return false;
}

function changePassword(currentPassword, newPassword) {
  const storedPassword = getStoredPassword();
  if (currentPassword === storedPassword) {
    localStorage.setItem(PASSWORD_KEY, newPassword);
    return true;
  }
  return false;
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
}

function checkAuth() {
  const authData = localStorage.getItem(AUTH_KEY);
  if (!authData) return false;

  try {
    const parsed = JSON.parse(authData);
    const now = new Date().getTime();
    const sessionDuration = 24 * 60 * 60 * 1000;
    
    if (now - parsed.timestamp > sessionDuration) {
      logout();
      return false;
    }
    
    return true;
  } catch (error) {
    return false;
  }
}