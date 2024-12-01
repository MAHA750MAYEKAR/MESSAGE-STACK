import { z } from 'zod';

export const workspaceZodSchema = z.object({
  name: z.string().min(1).max(50)
});
