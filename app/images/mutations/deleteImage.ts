import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const DeleteImage = z.object({
  id: z.string(),
})

export default resolver.pipe(resolver.zod(DeleteImage), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const image = await db.image.deleteMany({ where: { id } })

  return image
})
