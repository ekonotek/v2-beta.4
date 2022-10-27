import Head from "next/head"
import React, { FC } from "react"
import Link from "next/link"
import { BlitzLayout, Routes } from "@blitzjs/next"
import { useSession } from "@blitzjs/auth"
import { useMutation, useQuery } from "@blitzjs/rpc"
import getCurrentUser from "app/users/queries/getCurrentUser"
import Pre from "./Pre"
import { AppBar, Avatar, Button, styled, Toolbar, Typography } from "@mui/material"
import router from "next/router"
import PersistentDrawerLeft from "./components/Drawer"
import logout from "app/auth/mutations/logout"

const Buttons = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}))

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const [currentUser] = useQuery(getCurrentUser, null)
  const session = useSession()
  const [logoutMutation] = useMutation(logout)

  return (
    <>
      <Head>
        <title>{title || "v2-beta.4"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <AppBar position="fixed" color="primary">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              height: "20px",
            }}
          >
            <div style={{ display: "flex" }}>
              <PersistentDrawerLeft session={session} user={currentUser} />
            </div>
            {session.userId === null && (
              <Buttons>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    color: "#fff",
                    //backgroundColor: "#F17445",
                    height: "40px",
                    margin: "0 10px",
                  }}
                >
                  <Link href={Routes.LoginPage()}>
                    <Typography
                      sx={{ fontSize: "1em", color: "#fff", textDecoration: "none" }}
                      variant="body1"
                    >
                      Login
                    </Typography>
                  </Link>
                </Button>
              </Buttons>
            )}
            {session.userId && (
              <Buttons>
                {/* <Avatar user={currentUser} /> */}
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    color: "#fff",
                    // backgroundColor: "#F17445",
                    height: "40px",
                    margin: "0 10px",
                  }}
                  onClick={async () => {
                    await logoutMutation(), router.push("/")
                  }}
                >
                  <Typography
                    style={{ fontSize: "1em", color: "#fff", textDecoration: "none" }}
                    variant="body1"
                  >
                    Logout
                  </Typography>
                </Button>
              </Buttons>
            )}
          </Toolbar>
        </AppBar>
      </header>

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
        {/* <Typography variant="h3">LAYOUT</Typography> */}
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
