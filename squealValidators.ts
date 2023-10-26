import { z } from 'zod';
import { receiverString, userString, positiveInteger } from './utils/global';
import { featureCollectionSchema } from './utils/geojson';

const receiversArray = z
  .array(receiverString)
  .nonempty({
    message: 'Devi specificare almeno un destinatario',
  })
  .refine((items) => new Set(items).size === items.length, {
    message: 'Non puoi inserire destinatari duplicati',
  });

export const textBody = z.object({
  type: z.literal('text'),
  content: z.string().min(1),
});

export const mediaBody = z.object({
  type: z.literal('media'),
  content: z.string().url({ message: 'Devi inserire un URL valido' }),
});

export const geoBody = z.object({
  type: z.literal('geo'),
  content: featureCollectionSchema,
});
export const geoBodyString = geoBody.extend({
  content: featureCollectionSchema.transform((value) => JSON.stringify(value)),
});

export const squealWriteSchema = z.object({
  receivers: receiversArray,
  author: userString,
  body: z.discriminatedUnion('type', [textBody, mediaBody, geoBodyString]),
  category: z.array(z.string()),
});

export type squealWrite_t = z.infer<typeof squealWriteSchema>;

export const squealReadSchema = z.preprocess(
  (val) => {
    if (
      typeof val === 'object' &&
      val !== null &&
      'body' in val &&
      typeof val.body === 'object' &&
      val.body !== null &&
      'type' in val.body &&
      val.body.type === 'geo' &&
      'content' in val.body &&
      typeof val.body.content === 'string'
    ) {
      val.body.content = JSON.parse(val.body.content);
    }
    return val;
  },
  z.object({
    _id: z.string(), // TODO: https://stackoverflow.com/questions/76284139/how-to-use-a-zod-field-has-different-validation-based-on-conditions
    ...squealWriteSchema.shape,
    body: z.discriminatedUnion('type', [textBody, mediaBody, geoBody]),
    datetime: z.coerce.date(),
    impressions: positiveInteger,
    positive_reaction: positiveInteger,
    negative_reaction: positiveInteger,
  }),
);

export type squealRead_t = z.infer<typeof squealReadSchema>;
