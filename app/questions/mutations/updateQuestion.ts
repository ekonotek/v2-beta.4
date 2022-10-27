import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"

const UpdateQuestion = z.object({
  id: z.string(),
  text: z.string(),
  Choice: z.array(z.object({ id: z.string().optional(), text: z.string() })),
})

export default resolver.pipe(
  resolver.zod(UpdateQuestion),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    // const question = await db.question.update({ where: { id }, data })
    const question = await db.question.update({
      where: { id },
      data: {
        ...data,
        Choice: {
          upsert: data.Choice.map((choice) => ({
            where: { id: choice.id },
            create: { text: choice.text },
            update: { text: choice.text },
          })),
        },
      },
      include: {
        Choice: true,
      },
    })
    return question
  }
)
