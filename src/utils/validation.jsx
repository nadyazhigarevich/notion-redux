import { z } from 'zod';

export const passwordSchema = z.string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/^[A-Za-z0-9]+$/, { message: "Password must contain only Latin letters and digits" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one digit" });

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateForm = (email, password, repeatPassword) => {
  const validationErrors = {};

  if (!emailRegex.test(email)) {
    validationErrors.email = "Invalid email format";
  }

  try {
    passwordSchema.parse(password);
  } catch (error) {
    validationErrors.password = error.errors[0].message;
  }

  if (repeatPassword !== undefined && password !== repeatPassword) {
    validationErrors.repeatPassword = "Passwords do not match";
  }

  return validationErrors;
};