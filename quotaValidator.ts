import { z } from 'zod';
import { positiveInteger } from './utils/global';

export const quotaSchema = z
  .object({
    actualD: positiveInteger,
    actualW: positiveInteger,
    actualM: positiveInteger,
    maxD: positiveInteger,
    maxW: positiveInteger,
    maxM: positiveInteger,
  })
  .refine(
    (data) =>
      data.actualD <= data.maxD &&
      data.actualW <= data.maxW &&
      data.actualM <= data.maxM,
    {
      message: 'La quota attuale non può essere maggiore della quota massima',
    },
  )
  .refine((data) => data.maxW < 7 * data.maxD, {
    message:
      'La quota settimanale deve essere meno di 7 volte la quota giornaliera',
  })
  .refine((data) => data.maxM < 4 * data.maxW, {
    message:
      'La quota mensile deve essere meno di 4 volte la quota settimanale',
  });

export type quota_t = z.infer<typeof quotaSchema>;
