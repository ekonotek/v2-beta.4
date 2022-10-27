/* eslint-disable no-console */
// const { PrismaClient } = require('@prisma/client')
// const dotenv = require('dotenv')

// dotenv.config()
// const db = new PrismaClient()
// import signup from "app/auth/mutations/signup"
// import { Signup } from "app/auth/validations"
// import { useMutation, SecurePassword } from "blitz"

// blitz db seed --file=db/seeds-users

import { SecurePassword } from "@blitzjs/auth"
import db from "./index"

const USERS = [
  {
    firstName: "Rafael",
    lastName: "Cervantes",
    email: "ekonotek@gmail.com",
    password: "Power2use@",
    organizationName: "Ekonotek",
  },
  {
    firstName: "Leafar",
    lastName: "Setnavrec",
    email: "ketonoke@gmail.com",
    password: "Power2use@",
    organizationName: "Ketonoke",
  },
  {
    firstName: "Orlando",
    lastName: "Diaz",
    email: "olrlando.diaz@gmail.com",
    password: "Power2use@",
    organizationName: "Orlando",
  },
  {
    firstName: "Frank",
    lastName: "Diaz",
    email: "frank.diaz@gmail.com",
    password: "Power2use@",
    organizationName: "Frank",
  },
  {
    firstName: "Jose",
    lastName: "Piña",
    email: "jose.piña@gmail.com",
    password: "Power2use@",
    organizationName: "Jose Piña",
  },
  {
    firstName: "Iris",
    lastName: "Artist",
    email: "iris2.artist@gmail.com",
    password: "Power2use@",
    organizationName: "Iris 2",
  },
  {
    firstName: "Roxana",
    lastName: "Pereira",
    email: "rozana.pereira@gmail.com",
    password: "Power2use@",
    organizationName: "Roxana Pereira",
  },
  {
    firstName: "Emmanuel",
    lastName: "Rangel",
    email: "ferc2296@gmail.com",
    password: "Power2use@",
    organizationName: "E Rangel",
  },
  {
    firstName: "Leunamme",
    lastName: "Legnar",
    email: "cref6922@gmail.com",
    password: "Power2use@",
    organizationName: "L Legnar",
  },
]

const seed = async () => {
  const existing = await db.user.findMany()

  for (let i = 0; i < USERS.length; i++) {
    const user = USERS[i]
    if (user !== undefined) {
      // only inserts a plan if one with the exact same title doesn't already exist
      if (!existing.find((ex) => ex.email === user?.email)) {
        const hashedPassword = await SecurePassword.hash(user?.password.trim())
        const luser = await db.user.create({
          data: {
            name: user.firstName + " " + user.lastName,
            email: user?.email.toLowerCase().trim(),
            hashedPassword,
            role: "CUSTOMER",
            memberships: {
              create: {
                role: "OWNER",
                organization: {
                  create: {
                    name: user.organizationName,
                  },
                },
              },
            },
          },
        })
      }
    }
  }
}

export default seed
