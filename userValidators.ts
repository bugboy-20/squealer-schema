import { z } from 'zod';
import {
  standardString,
  userString,
  emailString,
  typeEnum,
  passwString,
  receiverString,
} from './utils/global';
import { quotaSchema } from './quotaValidator';

export const userReadSchema = z.object({
  username: userString,
  propic: z.string().url(),
  email: emailString,
  firstname: standardString,
  lastname: standardString,
  type: typeEnum,
  SMM: userString.nullable(),
  verified: z.boolean(),
  quota: quotaSchema,
  blocked: z.boolean(),
  subscriptions: z.array(receiverString),
});

export type userRead_t = z.infer<typeof userReadSchema>;

export const userWriteSchema = z.object({
  username: userString,
  propic: z.string().url().optional(),
  email: emailString,
  firstname: standardString,
  lastname: standardString,
  password: passwString,
  type: typeEnum,
});

export type userWrite_t = z.infer<typeof userWriteSchema>;
