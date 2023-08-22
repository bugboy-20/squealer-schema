import { z } from 'zod';
import {
  standardString,
  userString,
  emailString,
  typeEnum,
  passwString,
} from './utils/global';
import { quotaSchema } from './quotaValidator';

export const userReadSchema = z.object({
  username: userString,
  email: emailString,
  firstname: standardString,
  lastname: standardString,
  type: typeEnum,
  SMM: userString.nullable(),
  verified: z.boolean(),
  quote_modifier: z.number(),
  quote: quotaSchema,
});

export type userRead_t = z.infer<typeof userReadSchema>;

export const userWriteSchema = z.object({
  username: standardString,
  email: emailString,
  firstname: standardString,
  lastname: standardString,
  password: passwString,
  type: typeEnum,
  SMM: userString.nullable(),
});

export type userWrite_t = z.infer<typeof userWriteSchema>;
