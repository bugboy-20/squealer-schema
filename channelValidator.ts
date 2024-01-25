import { z } from 'zod';
import { channelString, userString } from './utils/global';

const normalChannelSchema = z.object({
  name: channelString,
  description: z.string(),
  type: z.enum(['public', 'private'], {
    description:
      'public: tutti possono iscriversi, private: solo gli invitati possono iscriversi',
    invalid_type_error: 'Il tipo deve essere public o private',
  }),
  subscribed: z.boolean().optional(),
});

const directChannelSchema = z.object({
  name: userString,
  description: z.string(),
  type: z.enum(["direct"], {
    description:
      'direct: chat diretta con un utente',
    invalid_type_error: 'Il tipo deve essere direct',
  }),
  subscribed: z.boolean().optional(),
});

export const channelSchema = z.discriminatedUnion(
  'type',
  [normalChannelSchema, directChannelSchema],
);

export type channel_t = z.infer<typeof channelSchema>;
