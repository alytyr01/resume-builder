export const validateEmail = (email: string): { valid: boolean; error?: string } => {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }
  
  const trimmed = email.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'Email is required' };
  }
  
  // Basic email regex - allows standard email formats
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }
  
  if (trimmed.length > 254) {
    return { valid: false, error: 'Email must be less than 254 characters' };
  }
  
  return { valid: true };
};

export const validatePassword = (password: string): { valid: boolean; error?: string } => {
  if (!password || typeof password !== 'string') {
    return { valid: false, error: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters' };
  }
  
  if (password.length > 128) {
    return { valid: false, error: 'Password must be less than 128 characters' };
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    return { valid: false, error: 'Password must contain at least one number' };
  }
  
  // Check for at least one letter
  if (!/[a-zA-Z]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one letter' };
  }
  
  return { valid: true };
};

export const validateLoginForm = (email: string, password: string): { valid: boolean; errors?: { email?: string; password?: string } } => {
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);
  
  if (!emailValidation.valid || !passwordValidation.valid) {
    return {
      valid: false,
      errors: {
        email: emailValidation.error,
        password: passwordValidation.error,
      },
    };
  }
  
  return { valid: true };
};