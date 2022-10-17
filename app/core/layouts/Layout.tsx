import Head from "next/head"
import React, { FC } from "react"
import { BlitzLayout } from "@blitzjs/next"
import { useSession } from "@blitzjs/auth"
import { useQuery } from "@blitzjs/rpc"
import getCurrentUser from "app/users/queries/getCurrentUser"
import Pre from "./Pre"
import { Typography } from "@mui/material"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const [currentUser] = useQuery(getCurrentUser, null)
  const session = useSession()

  return (
    <>
      <Head>
        <title>{title || "v2-beta.4"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          marginTop: "100px",
          marginLeft: "5vw",
          marginRight: "5vw",
          marginBottom: "38px",
          minHeight: "100vh",
          maxWidth: "1800px",
        }}
      >
        <Typography variant="h3">LAYOUT</Typography>
        {children}
        <div style={{ margin: "-30px 500px 0px 500px" }}>
          {currentUser?.role === "CUSTOMER" ? <Pre session={session} /> : <div></div>}
          {/* <Pre session={session} />
          <pre>{JSON.stringify(currentUser, null, 2)}</pre>; */}
        </div>
      </div>
    </>
  )
}

export default Layout
