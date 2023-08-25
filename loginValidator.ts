import { z } from 'zod';
import { passwString, userString } from './utils/global';

export const loginSchema = z.object({
  username: userString,
  password: passwString,
});

export type login_t = z.infer<typeof loginSchema>;
