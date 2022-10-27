import React from "react"
import {
  CssBaseline,
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  styled,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded"
import Link from "next/link"
// import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined"

const drawerWidth = 240

const Buttons = styled("div")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}))

export default function PersistentDrawerLeft({ session, user }) {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const currentUserIsAdmin =
    session && session.roles && ["SUPERADMIN", "STAFF", "OWNER"].includes(session?.roles[1])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  // const pages = ["app/pages/gallery", "app/pages/projects", "app/pages/images"]
  const pages = [
    { name: "choices", adminPage: true },
    { name: "images", adminPage: true },
    { name: "memberships", adminPage: true },
    { name: "organizations", adminPage: true },
    { name: "questions", adminPage: true },
    { name: "tokens", adminPage: true },
    { name: "tags", adminPage: true },
    { name: "users", adminPage: true },
  ]
  return (
    <div style={{ display: "flex" }} onBlur={(e) => handleDrawerClose()}>
      <CssBaseline />
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <IconButton
        style={{ color: "#fff", margin: "0 10px" }}
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        // className={clsx(classes.menuButton, open && classes.hide)}
        sx={{ height: "40px", width: "40px" }}
      >
        <MenuIcon
          fontSize="large"
          sx={{ height: "40px", width: "40px" }}
          // className={classes.menuButton}
        />
      </IconButton>
      <Drawer
        // className={classes.drawer}
        sx={{
          width: 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div
        // className={classes.drawerHeader}
        >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {/* <Divider /> */}
          <div>
            {/* <Buttons
            >
              <LoginComponent
                o={handleDrawerOpen}
                c={handleDrawerClose}
                style={{ outline: "1px solid red" }}
              />
            </Buttons> */}
            {pages.map((pg, index) => {
              if (pg.adminPage === true && currentUserIsAdmin) {
                return (
                  <ListItem button key={index} onClick={handleDrawerClose}>
                    <ListItemIcon>
                      <DashboardRoundedIcon />
                    </ListItemIcon>
                    <Link href={`/${pg.name}`}>
                      <ListItemText primary={pg.name} />
                    </Link>
                  </ListItem>
                )
              }
            })}
          </div>
          {/* <pre>{JSON.stringify(session, null, 2)}</pre>; */}
          {/* <pre>{JSON.stringify(user.Artist, null, 2)}</pre>; */}
        </List>
      </Drawer>
    </div>
  )
}
