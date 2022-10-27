import * as z from "zod"

export const CreateQuestion = z.object({
  text: z.string().min(5),
  // text: z.string(),
  Choice: z.array(z.object({ text: z.string() })),
})
