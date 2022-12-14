import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const DeleteTag = z.object({
  id: z.string(),
})

export default resolver.pipe(resolver.zod(DeleteTag), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const tag = await db.tag.deleteMany({ where: { id } })

  return tag
})
