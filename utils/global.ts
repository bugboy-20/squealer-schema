import { z } from 'zod';

const passwRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-.]).{8,}$/;

export const passwString = z
  .string()
  .min(8, { message: 'La password deve avere minimo 8 caratteri.' })
  .max(40, { message: 'La password deve essere al massimo 40 caratteri' })
  .regex(passwRegex, {
    message:
      'La password deve avere minimo 8 caratteri. Di cui uno maiuscolo, uno speciale e un numero',
  });

export const userString = z.custom<`@${string}`>(
  (val) => /@(.+)/.test(val as string),
  {
    message: "Un utente deve iniziare con '@'",
  },
);

export const channelString = z.custom<`§${string}` | `#${string}`>(
  (val) => /^§([a-z]+|[A-Z]+)|#.+$/.test(val as string),
  {
    message:
      "Il canale deve iniziare con '#' o '§' e deve esssere tutto minuscolo o tutto maiuscolo",
  },
);

export const officialChannelString = z.custom<`§${string}`>(
  (val) => /^§[A-Z]+.+$/.test(val as string)
);

export const receiverString = z.union([userString, channelString], {
  errorMap: (issue, ctx) => {
    if (issue.code === 'invalid_union')
      return { message: 'Un destinatario deve iniziare con @, # o §' };
    return { message: ctx.defaultError };
  },
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
