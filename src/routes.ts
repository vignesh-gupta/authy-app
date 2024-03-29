/**
 * An array of routes that are public and do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/verify-email"];

/**
 * An array of routes that are used for authentication.
 * These route will redirect logged in users to settings page.
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
];

/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for authentication purpose.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect URL after login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
