import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function GoogleAuth({ user, onLoginSuccess, onLogout }) {
  const handleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const userData = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        token: credentialResponse.credential,
      };
      onLoginSuccess(userData);
    } catch (error) {
      console.error('Failed to decode credential:', error);
    }
  };

  const handleLoginError = () => {
    console.error('Google login failed');
  };

  const handleLogout = () => {
    googleLogout();
    onLogout();
  };

  if (user) {
    // User is logged in - show profile
    return (
      <div className="flex items-center gap-2 lg:gap-3">
        <img
          src={user.picture}
          alt={user.name}
          className="w-8 h-8 rounded-full border-2 border-macos-border dark:border-macos-dark-border"
        />
        <div className="hidden lg:block">
          <p className="text-sm font-medium text-macos-text dark:text-macos-dark-text">
            {user.name}
          </p>
          <p className="text-xs text-macos-text-secondary dark:text-macos-dark-text-secondary">
            {user.email}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-1.5 text-sm rounded-macos button-secondary dark:text-macos-dark-text"
        >
          Logout
        </button>
      </div>
    );
  }

  // User is not logged in - show login button
  return (
    <div className="flex items-center gap-2">
      <p className="text-sm text-macos-text-secondary dark:text-macos-dark-text-secondary hidden sm:block">
        Sign in to save your lists
      </p>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
        size="medium"
        shape="rectangular"
        theme="outline"
        text="signin_with"
      />
    </div>
  );
}
