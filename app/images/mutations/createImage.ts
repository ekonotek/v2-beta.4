import { resolver } from "@blitzjs/rpc"
import getCurrentUser from "app/users/queries/getCurrentUser"
import db, { ImageTypes } from "db"
import { CreateImage } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateImage),
  resolver.authorize(),
  async (input, ctx) => {
    const currentUser = await getCurrentUser(null, ctx)
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const image = await db.image.create({
      data: {
        nameFile: input.nameFile,
        caption: input.caption,
        description: input.description,
        type: input.type,
        // projectId: input.projectId,
        createdBy: {
          connect: {
            id: currentUser?.id,
          },
        },
      },
    })

    return image
  }
)
