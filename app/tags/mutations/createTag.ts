import { resolver } from "@blitzjs/rpc"
import getCurrentUser from "app/users/queries/getCurrentUser"
import db from "db"
import { z } from "zod"

const CreateTag = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateTag), resolver.authorize(), async (input, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const currentUser = await getCurrentUser(null, ctx)
  const tag = await db.tag.create({
    data: {
      name: input.name,
      createdBy: {
        connect: { id: currentUser?.id },
      },
    },
  })

  return tag
})
