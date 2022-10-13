import { z } from "zod"

export const CreateTag = z.object({
  // name: z.string({ mesage: "Ponga atencion" }),
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
})
