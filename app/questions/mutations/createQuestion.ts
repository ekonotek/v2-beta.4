import { resolver } from "@blitzjs/rpc"
import getCurrentUser from "app/users/queries/getCurrentUser"
import db from "db"
import { CreateQuestion } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateQuestion),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const currentUser = await getCurrentUser(null, ctx)
    const question = await db.question.create({
      data: {
        text: input.text,
        organization: {
          connect: {
            id: ctx.session.orgId,
          },
        },
        createdBy: {
          connect: { id: currentUser?.id },
        },
        Choice: {
          create: input.Choice,
        },
      },
    })

    return question
  }
)
