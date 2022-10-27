import { resolver } from "@blitzjs/rpc"
import getCurrentUser from "app/users/queries/getCurrentUser"
import db from "db"
import { CreateTag } from "../validations"

export default resolver.pipe(resolver.zod(CreateTag), resolver.authorize(), async (input, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const currentUser = await getCurrentUser(null, ctx)
  const tag = await db.tag.create({
    data: {
      name: input.name,
      organization: {
        connect: {
          id: ctx.session.orgId,
        },
      },
      createdBy: {
        connect: { id: currentUser?.id },
      },
    },
  })

  return tag
})
