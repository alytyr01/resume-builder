interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private attempts: Map<string, RateLimitEntry> = new Map();
  private windowMs: number;
  private maxAttempts: number;

  constructor(windowMs: number = 15 * 60 * 1000, maxAttempts: number = 5) {
    this.windowMs = windowMs;
    this.maxAttempts = maxAttempts;
    
    // Cleanup expired entries every minute
    setInterval(() => this.cleanup(), 60 * 1000);
  }

  isLimited(key: string): boolean {
    const entry = this.attempts.get(key);
    
    if (!entry) {
      return false;
    }
    
    // Check if the window has expired
    if (Date.now() > entry.resetTime) {
      this.attempts.delete(key);
      return false;
    }
    
    // Check if limit exceeded
    return entry.count >= this.maxAttempts;
  }

  recordAttempt(key: string): void {
    const entry = this.attempts.get(key);
    const now = Date.now();
    
    if (!entry || now > entry.resetTime) {
      // Start new window
      this.attempts.set(key, {
        count: 1,
        resetTime: now + this.windowMs,
      });
    } else {
      // Increment count
      entry.count++;
    }
  }

  getRemainingTime(key: string): number {
    const entry = this.attempts.get(key);
    
    if (!entry) {
      return 0;
    }
    
    const remaining = entry.resetTime - Date.now();
    return remaining > 0 ? remaining : 0;
  }

  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];
    
    this.attempts.forEach((entry, key) => {
      if (now > entry.resetTime) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => this.attempts.delete(key));
  }

  reset(key: string): void {
    this.attempts.delete(key);
  }
}

// Singleton instance for login rate limiting
export const loginRateLimiter = new RateLimiter(15 * 60 * 1000, 5); // 5 attempts per 15 minutes

// Helper to get client identifier (IP address or fallback)
export const getClientIdentifier = (): string => {
  // In a real app, you'd get this from the server
  // For client-side, we'll use a combination of user agent and localStorage
  const userAgent = navigator.userAgent;
  const stored = localStorage.getItem('client_id');
  
  if (stored) {
    return stored;
  }
  
  // Generate a simple identifier
  const id = `${userAgent.substring(0, 50)}_${Date.now()}`;
  localStorage.setItem('client_id', id);
  return id;
};