/**
 * An array of routes that are public and do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication.
 * These route will redirect logged in users to settings page.
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/** 
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for authentication purpose.
 * @type {string}
*/
export const apiAuthPublic = '/api/auth'

/**
 * The default redirect URL after login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";