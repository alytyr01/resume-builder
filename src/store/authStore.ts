import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { csrf } from '@/lib/auth/csrf';
import { validateLoginForm } from '@/lib/auth/validation';
import { loginRateLimiter, getClientIdentifier } from '@/lib/auth/rateLimiter';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  
  // Actions
  login: (email: string, password: string, csrfToken: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      error: null,
      isLoading: false,

      login: async (email: string, password: string, csrfToken: string) => {
        // Clear previous error
        set({ error: null, isLoading: true });

        // Validate CSRF token
        if (!csrf.validateToken(csrfToken)) {
          set({ error: 'Invalid request. Please refresh and try again.', isLoading: false });
          return { success: false, error: 'Invalid CSRF token' };
        }

        // Validate form inputs
        const validation = validateLoginForm(email, password);
        if (!validation.valid) {
          const errorMessage = validation.errors?.email || validation.errors?.password || 'Invalid credentials';
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }

        // Check rate limit
        const clientId = getClientIdentifier();
        if (loginRateLimiter.isLimited(clientId)) {
          const remainingSeconds = Math.ceil(loginRateLimiter.getRemainingTime(clientId) / 1000);
          const errorMessage = `Too many login attempts. Please try again in ${remainingSeconds} seconds.`;
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }

        // Record attempt
        loginRateLimiter.recordAttempt(clientId);

        // Simulate API call - In production, this would be an actual API call
        try {
          // Simulated delay for API call
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Mock authentication - In production, this would be handled by the server
          // NEVER expose actual user data in client-side code
          // This is just a placeholder for demonstration
          const mockResponse = await mockAuthAPI(email, password);

          if (mockResponse.success && mockResponse.user) {
            const user: User = {
              id: mockResponse.user.id,
              email: mockResponse.user.email,
              name: mockResponse.user.email.split('@')[0], // Use email prefix as name for demo
            };

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            // Reset rate limit on successful login
            loginRateLimiter.reset(clientId);

            // Generate new CSRF token after successful login
            csrf.generateToken();

            return { success: true };
          } else {
            set({
              error: mockResponse.error || 'Invalid email or password',
              isLoading: false,
            });
            return { success: false, error: mockResponse.error || 'Invalid credentials' };
          }
        } catch (error) {
          set({
            error: 'An error occurred during login. Please try again.',
            isLoading: false,
          });
          return { success: false, error: 'Network error' };
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
        
        // Clear CSRF token on logout
        csrf.clearToken();
        
        // Generate new token for next session
        csrf.generateToken();
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Mock authentication API - REPLACE WITH REAL API IN PRODUCTION
// This should NEVER expose sensitive user data
async function mockAuthAPI(email: string, password: string): Promise<{
  success: boolean;
  user?: { id: string; email: string };
  error?: string;
}> {
  // This is a mock implementation for demonstration only
  // In production, this would be a real API endpoint
  
  // Simulate credential check
  if (email === 'demo@example.com' && password === 'Demo1234') {
    return {
      success: true,
      user: {
        id: 'user_123',
        email: 'demo@example.com',
      },
    };
  }
  
  // For demo purposes, accept any valid credentials
  // In production, this would return false for invalid credentials
  if (password.length >= 8 && !password.includes(' ')) {
    return {
      success: true,
      user: {
        id: crypto.randomUUID(),
        email,
      },
    };
  }
  
  return {
    success: false,
    error: 'Invalid email or password',
  };
}