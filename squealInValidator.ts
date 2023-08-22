import z from 'zod';
import { receiverString, userString } from './utils/global';

export const squealInSchema = z.object({
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
  category: z.array(z.string()),
  automatic_receiver: z
    .array(receiverString)
    .refine((items) => new Set(items).size === items.length, {
      message: 'Non puoi inserire destinatari duplicati',
    }),
});

export type squealIn_t = z.infer<typeof squealInSchema>;
