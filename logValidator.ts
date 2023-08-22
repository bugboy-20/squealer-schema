import { z } from 'zod';

export const logSchema = z.object({
  path: z.string().url(),
  method: z.enum(['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']),
  message: z.string(),
});
