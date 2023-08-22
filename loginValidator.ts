import { z } from 'zod';
import { passwString, standardString } from './utils/global';

export const loginSchema = z.object({
  username: standardString,
  password: passwString,
});

export type loginSchema_t = z.infer<typeof loginSchema>;
