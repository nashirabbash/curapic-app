const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(
  email: string,
  password: string,
): { email?: string; password?: string } {
  const errors: ReturnType<typeof validateLogin> = {};
  if (!email.trim()) errors.email = "Email is required";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address";
  if (!password) errors.password = "Password is required";
  return errors;
}

export function validateSignUpStep(
  tahap: number,
  value: string,
  password: string,
): string | undefined {
  switch (tahap) {
    case 1:
      return value.trim() ? undefined : "Please enter your full name";
    case 2:
      if (!value.trim()) return "Email is required";
      return EMAIL_RE.test(value) ? undefined : "Enter a valid email address";
    case 3:
      if (value.length < 8) return "Password must be at least 8 characters";
      return /[A-Za-z]/.test(value) && /\d/.test(value)
        ? undefined
        : "Password must contain letters and numbers";
    case 4:
      return value === password ? undefined : "Passwords don't match";
    case 5:
      return /^\d{6}$/.test(value) ? undefined : "Enter the 6-digit code";
    default:
      return undefined;
  }
}
