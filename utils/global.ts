import { z } from 'zod';
import { channelRegex, officialChannelRegex, usernameRegex } from './regex';

export const passwString = z
  .string()
  .min(8, { message: 'La password deve avere minimo 8 caratteri.' })
  .max(40, { message: 'La password deve essere al massimo 40 caratteri' });
// .regex(passwRegex, {
//   message:
//     'La password deve avere minimo 8 caratteri. Di cui uno maiuscolo, uno speciale e un numero',
// });

export const userString = z.custom<`@${string}`>(
  (val) => usernameRegex.test(val as string),
  {
    message: "Un utente deve iniziare con '@'",
  },
);

export const channelString = z.custom<`§${string}` | `#${string}`>(
  (val) => channelRegex.test(val as string),
  {
    message:
      "Il canale deve iniziare con '#' o '§' e deve esssere tutto minuscolo o tutto maiuscolo",
  },
);

export const officialChannelString = z.custom<`§${string}`>((val) =>
  officialChannelRegex.test(val as string),
);

export const receiverString = z.union([userString, channelString], {
  errorMap: (issue, ctx) => {
    if (issue.code === 'invalid_union')
      return { message: 'Un destinatario deve iniziare con @, # o §' };
    return { message: ctx.defaultError };
  },
});

export const receiversArray = z
  .array(receiverString)
  .nonempty({
    message: 'Devi specificare almeno un destinatario',
  })
  .refine((items) => new Set(items).size === items.length, {
    message: 'Non puoi inserire destinatari duplicati',
  });

export const standardString = z
  .string()
  .min(3, { message: 'Devi inserire almeno 3 caratteri' })
  .max(20, { message: 'Devi inserire al massimo 20 caratteri' });

export const emailString = z
  .string()
  .email({ message: "L'email non è valida" });

export const positiveInteger = z.number().int().min(0);

export const typeEnum = z.enum(['standard', 'professional', 'moderator']);
export type userType_t = z.infer<typeof typeEnum>;
