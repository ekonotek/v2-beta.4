import { SimpleRolesIsAuthorized } from "@blitzjs/auth"
import { User } from "db"
import { GlobalRole, MembershipRole, Organization } from "db"

type Role = MembershipRole | GlobalRole | undefined

declare module "@blitzjs/auth" {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User["id"]

      roles: Array<Role>

      orgId?: Organization["id"]
    }
  }
}
