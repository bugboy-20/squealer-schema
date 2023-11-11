import { z } from 'zod';
import { channelString } from './utils/global';

export const channelSchema = z.object({
  name: channelString,
  description: z.string(),
  type: z.enum(['public', 'private'], {
    description:
      'public: tutti possono iscriversi, private: solo gli invitati possono iscriversi',
    invalid_type_error: 'Il tipo deve essere public o private',
  }),
  subscribed: z.boolean().optional(),
});

export type channel_t = z.infer<typeof channelSchema>;
