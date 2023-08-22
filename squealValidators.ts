import {z} from "zod";

const squealWriteSchema = z.object({
  receivers: z.array(z.string()),
  author: z.string(),
  body: z.string(), //TODO rifinire
  category: z.array(z.string()),
  automatic_receiver: z.array(z.string()),
});

const squealReadSchema = z.object({
  id: z.number(),
  receivers: z.array(z.string()),
  author: z.string(),
  body: z.string(), // You can refine this based on the actual types allowed
  datetime: z.date(),
  impressions: z.number().int().positive(),
  positive_reaction: z.number().int().positive(),
  negative_reaction: z.number().int().positive(),
  category: z.array(z.string()),
  automatic_receiver: z.array(z.string()),
});

export { squealReadSchema, squealWriteSchema }
