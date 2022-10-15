import Head from "next/head"
import React, { FC } from "react"
import { BlitzLayout } from "@blitzjs/next"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
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
        {children}
      </div>
    </>
  )
}

export default Layout
