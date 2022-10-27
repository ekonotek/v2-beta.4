import { SecurePassword } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import { AuthenticationError } from "blitz"
import db, { GlobalRole, MembershipRole } from "db"
// import { Role } from "types"
import { Login } from "../validations"
type GRole = typeof GlobalRole
type MRole = typeof MembershipRole

export const authenticateUser = async (rawEmail: string, rawPassword: string) => {
  const { email, password } = Login.parse({ email: rawEmail, password: rawPassword })
  const user = await db.user.findFirst({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      hashedPassword: true,
      role: true,
      memberships: {
        select: {
          id: true,
          role: true,
          organizationId: true,
          organization: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  })
  if (!user) throw new AuthenticationError()

  const result = await SecurePassword.verify(user.hashedPassword, password)

  if (result === SecurePassword.VALID_NEEDS_REHASH) {
    // Upgrade hashed password with a more secure hash
    const improvedHash = await SecurePassword.hash(password)
    await db.user.update({ where: { id: user.id }, data: { hashedPassword: improvedHash } })
  }

  const { hashedPassword, ...rest } = user
  return rest
}

export default resolver.pipe(resolver.zod(Login), async ({ email, password }, ctx) => {
  // This throws an error if credentials are invalid
  const user = await authenticateUser(email, password)

  await ctx.session.$create({
    userId: user.id,
    roles: [user.role, user.memberships[0]?.role],
    orgId: user.memberships[0]?.organizationId || "",
  })
  return user
})
