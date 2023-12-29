import { z } from 'zod';
import { userString } from './utils/global';
import { geoBody, mediaBody, textBody } from './utils/squealBody';

export const commentWriteSchema = z.object({
  reference: z.string(),
  body: z.discriminatedUnion('type', [textBody, mediaBody, geoBody]),
});

export type commentWrite_t = z.infer<typeof commentWriteSchema>;

const baseCommentReadSchema = z.object({
  id: z.string(),
  ...commentWriteSchema.shape,
  author: userString,
  datetime: z.coerce.date(),
});

export type commentRead_t = z.infer<typeof baseCommentReadSchema> & {
  comments: commentRead_t[];
};

export const commentReadSchema: z.ZodType<commentRead_t> =
  baseCommentReadSchema.extend({
    comments: z.lazy(() => z.array(commentReadSchema)),
  });
