import { z } from 'zod';
import { receiverString, userString, positiveInteger } from './utils/global';

const receiversArray = z
  .array(receiverString)
  .nonempty({
    message: 'Devi specificare almeno un destinatario',
  })
  .refine((items) => new Set(items).size === items.length, {
    message: 'Non puoi inserire destinatari duplicati',
  });

export const squealWriteSchema = z.object({
  receivers: receiversArray,
  author: userString,
  body: z.string().regex(/^(txt|img|vid|geo):.*/,{ message: 'Specifica il tipo di bodyche vuoi assengnare'}),  
  category: z.array(z.string()),
});

export type squealWrite_t = z.infer<typeof squealWriteSchema>;

export const squealReadSchema = z.object({
  _id: z.string(), // TODO: https://stackoverflow.com/questions/76284139/how-to-use-a-zod-field-has-different-validation-based-on-conditions
  ...squealWriteSchema.shape,
  datetime: z.coerce.date(),
  impressions: positiveInteger,
  positive_reaction: positiveInteger,
  negative_reaction: positiveInteger,
  });

export type squealRead_t = z.infer<typeof squealReadSchema>;


