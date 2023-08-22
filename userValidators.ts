import { z } from "zod";

const quotaSchema = z.object({
  actualD: z.number().positive().int(),
  actualW: z.number().positive().int(),
  actualM: z.number().positive().int(),
  maxD: z.number().positive().int(),
  maxW: z.number().positive().int(),
  maxM: z.number().positive().int(),
});

const userReadSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  type: z.enum(["standard", "professional", "moderator"]),
  SMM: z.string().nullable(),
  verified: z.boolean(),
  quote_modifier: z.number(),
  quote: quotaSchema,
});

const userWriteSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string(),
  type: z.enum(["standard", "professional", "moderator"]),
  SMM: z.string().nullable(),
});

export { quotaSchema, userReadSchema, userWriteSchema }
