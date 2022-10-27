import { ImageTypes } from "@prisma/client"
import * as z from "zod"

export const CreateImage = z.object({
  nameFile: z.string(),
  caption: z.string(),
  description: z.string(),
  type: z.nativeEnum(ImageTypes),
  projectId: z.number().optional(),
  userId: z.number().optional(),
})
