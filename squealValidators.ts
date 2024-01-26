import { z } from 'zod';
import { commentReadSchema } from './commentValidators';
import { positiveInteger, receiversArray, userString } from './utils/global';
import { geoBody, mediaBody, textBody } from './utils/squealBody';

export const squealWriteSchema = z.object({
  receivers: receiversArray,
  body: z.discriminatedUnion('type', [textBody, mediaBody, geoBody]),
  author: userString.optional(),
});

export type squealWrite_t = z.infer<typeof squealWriteSchema>;

export const squealReadSchema = z.object({
  id: z.string(), // https://stackoverflow.com/questions/76284139/how-to-use-a-zod-field-has-different-validation-based-on-conditions
  ...squealWriteSchema.shape,
  author: userString,
  datetime: z.coerce.date(),
  impressions: positiveInteger,
  positive_reaction: positiveInteger,
  negative_reaction: positiveInteger,
  reacted: z.boolean().default(false),
  isViewed: z.boolean().default(false),
  category: z.array(z.string()),
  comments: z.array(commentReadSchema),
});

export type squealRead_t = z.infer<typeof squealReadSchema>;

export type looseSquealRead_t = {
  id: squealRead_t['id'];
  author: string;
  receivers: string[];
  body: squealRead_t['body'];
  datetime: squealRead_t['datetime'];
  impressions: squealRead_t['impressions'];
  positive_reaction: squealRead_t['positive_reaction'];
  negative_reaction: squealRead_t['negative_reaction'];
  reacted: squealRead_t['reacted'];
  isViewed: squealRead_t['isViewed'];
  category: squealRead_t['category'];
  comments: squealRead_t['comments'];
};
