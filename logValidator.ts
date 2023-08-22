import { z } from "zod";

const logSchema = z.object({
  path: z.string().url(),
  method: z.enum(['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']),
  message: z.string()
})

export {logSchema};
