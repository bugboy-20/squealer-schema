import { z } from 'zod';
import { squealWriteSchema, squealReadSchema } from './squealValidators';

export const commentWriteSchema = squealWriteSchema
  .omit({ category: true })
  .extend({ reference: z.string() });

export type commentWrite_t = z.infer<typeof commentWriteSchema>;

export const commentReadSchema = squealReadSchema
  .omit({ category: true })
  .extend({ reference: z.string() });

export type commentRead_t = z.infer<typeof commentReadSchema>;
