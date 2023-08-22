import { z } from 'zod';
import { userString, receiverString, positiveInteger } from './utils/global';

export const squealOutSchema = z.object({
  _id: z.string(), // TODO: https://stackoverflow.com/questions/76284139/how-to-use-a-zod-field-has-different-validation-based-on-conditions
  receivers: z
    .array(receiverString)
    .nonempty({
      message: 'Devi specificare almeno un destinatario',
    })
    .refine((items) => new Set(items).size === items.length, {
      message: 'Non puoi inserire destinatari duplicati',
    }),
  author: userString,
  body: z.string(),
  datetime: z.coerce.date(),
  impressions: positiveInteger,
  positive_reaction: positiveInteger,
  negative_reaction: positiveInteger,
  category: z.array(z.string()),
  automatic_receivers: z
    .array(receiverString)
    .refine((items) => new Set(items).size === items.length, {
      message: 'Non puoi inserire destinatari duplicati',
    }),
});

export type squealOut_t = z.infer<typeof squealOutSchema>;
