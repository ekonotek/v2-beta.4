import { SecurePassword } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import db, { GlobalRole, MembershipRole } from "db"
// import { Role } from "types"
import { Signup } from "../validations"

type GRole = typeof GlobalRole
type MRole = typeof MembershipRole

export default resolver.pipe(
  resolver.zod(Signup),
  async ({ email, password, organizationName }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const user = await db.user.create({
      data: {
        email: email.toLowerCase().trim(),
        hashedPassword,
        role: "CUSTOMER",
        memberships: {
          create: {
            role: "OWNER",
            organization: {
              create: {
                name: organizationName,
              },
            },
          },
        },
      },
      select: { id: true, name: true, email: true, role: true, memberships: true },
    })

    await ctx.session.$create({
      userId: user.id,
      // roles: [user.role as unknown as GRole, user.memberships[0]?.role as unknown as MRole],
      roles: [user.role, user.memberships[0]?.role],
      orgId: user.memberships[0]?.organizationId || "",
    })

    return user
  }
)
