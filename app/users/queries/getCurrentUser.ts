import { Ctx } from "blitz"
import db from "db"

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId as string },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      memberships: {
        select: {
          organization: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  return user
}
