import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { inputAdornmentClasses } from "@mui/material"

const GetTag = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetTag), resolver.authorize(), async ({ id }, ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const tag = await db.tag.findFirst({
    where: {
      id: id,
      organizationId: ctx.session.orgId,
    },
  })

  if (!tag) throw new NotFoundError()

  return tag
})
