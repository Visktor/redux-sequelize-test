import { ZodError } from "zod";

export function isZodError(error: any): error is ZodError {
  return error instanceof ZodError;
}
