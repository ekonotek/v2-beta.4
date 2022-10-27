/* eslint-disable no-console */
// const { PrismaClient } = require('@prisma/client')
// const dotenv = require('dotenv')

// dotenv.config()
// const db = new PrismaClient()

import db from "./index"
// import chance from "chance"
var chance = require("chance").Chance()

const seed = async () => {
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      memberships: {
        select: {
          id: true,
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

  for (let i = 0; i < users.length; i++) {
    console.log(users[i]?.email)
    console.log(users[i]?.memberships?.at(0)?.organization.id)
    let n = chance.integer({ min: 1, max: 20 })
    console.log(n)
    for (let j = 0; j < n; j++) {
      const ltag = await db.tag.create({
        data: {
          name: chance.string(),
          // organizationId: ctx.session.orgId,
          organization: {
            connect: {
              id: users[i]?.memberships.at(0)?.organization.id,
            },
          },
          createdBy: {
            connect: { id: users?.at(i)?.id },
          },
        },
      })
      console.log(ltag.name)
    }
  }
}

export default seed

// FINE ART
// ABSTRACT
// MODERN
//
// FIGURATIVE
// AIRBRUSH
// WATER COLOR
//
// LANDSCAPE
// STILL LIFE
// NATURE
// POP ART BEACH
//
// PORTRAIT
// OIL
// DADAISM
// ACRYLIC DRAWING
