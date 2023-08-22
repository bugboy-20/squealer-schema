import { z } from 'zod';
import {
  standardString,
  userString,
  emailString,
  typeEnum,
} from './utils/global';
import { quoteSchema } from './quoteValidator';

export const userOutSchema = z.object({
  username: userString,
  email: emailString,
  firstname: standardString,
  lastname: standardString,
  type: typeEnum,
  SMM: userString.nullable(),
  verified: z.boolean(),
  quote_modifier: z.number(),
  quote: quoteSchema,
});

export type userOut_t = z.infer<typeof userOutSchema>;
