import { z } from 'zod';
import { passwString, standardString } from './utils/global';

export const loginSchema = z.object({
  username: standardString.transform((val) => `@${val}`),
  password: passwString,
});

export type login_t = z.infer<typeof loginSchema>;
