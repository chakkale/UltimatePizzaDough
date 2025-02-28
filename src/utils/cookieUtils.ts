// Cookie utility functions for managing user preferences

/**
 * Set a cookie with the given name, value, and expiration days
 */
export const setCookie = (name: string, value: string, days: number = 365): void => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`;
};

/**
 * Get a cookie value by name
 * Returns empty string if cookie doesn't exist
 */
export const getCookie = (name: string): string => {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }
  }
  return '';
};

/**
 * Delete a cookie by name
 */
export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict`;
};

/**
 * Check if a cookie exists
 */
export const cookieExists = (name: string): boolean => {
  return getCookie(name) !== '';
}; 