import { resolver } from "@blitzjs/rpc"
import db, { ImageTypes } from "db"
import { z } from "zod"

const UpdateImage = z.object({
  id: z.string(),
  nameFile: z.string(),
  caption: z.string(),
  description: z.string(),
  type: z.nativeEnum(ImageTypes),
  projectId: z.number().optional(),
})

export default resolver.pipe(
  resolver.zod(UpdateImage),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const image = await db.image.update({ where: { id }, data })

    return image
  }
)
