import { z } from 'zod';
import { passwString } from './utils/global';

export const changepswSchema = z.object({
  oldPassword: passwString,
  password: passwString,
});

export type changepsw_t = z.infer<typeof changepswSchema>;
