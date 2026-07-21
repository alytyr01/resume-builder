export class CSRFProtection {
  private tokenKey = 'csrf_token';
  private headerName = 'X-CSRF-Token';

  /**
   * Generate a new CSRF token
   */
  generateToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    const token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    
    // Store token in sessionStorage (not localStorage for security)
    sessionStorage.setItem(this.tokenKey, token);
    
    return token;
  }

  /**
   * Get the current CSRF token
   */
  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  /**
   * Validate that the provided token matches the stored token
   */
  validateToken(providedToken: string | null): boolean {
    if (!providedToken) {
      return false;
    }
    
    const storedToken = this.getToken();
    return storedToken !== null && storedToken === providedToken;
  }

  /**
   * Get the CSRF token header value for API requests
   */
  getAuthHeader(): { [key: string]: string } {
    const token = this.getToken();
    if (!token) {
      return {};
    }
    return { [this.headerName]: token };
  }

  /**
   * Clear the CSRF token (on logout)
   */
  clearToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }

  /**
   * Verify CSRF token from request (server-side simulation)
   */
  static verifyRequest(token: string | null, storedToken: string | null): boolean {
    if (!token || !storedToken) {
      return false;
    }
    return token === storedToken;
  }
}

// Singleton instance
export const csrf = new CSRFProtection();