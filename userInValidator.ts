import { z } from 'zod';
import {
  passwString,
  userString,
  standardString,
  typeEnum,
  emailString,
} from './utils/global';

export const userInSchema = z.object({
  username: standardString,
  email: emailString,
  firstname: standardString,
  lastname: standardString,
  password: passwString,
  type: typeEnum,
  SMM: userString.nullable(),
});

export type userIn_t = z.infer<typeof userInSchema>;
