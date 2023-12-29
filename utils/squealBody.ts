import z from 'zod';
import { featureCollectionSchema } from './geojson';

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
