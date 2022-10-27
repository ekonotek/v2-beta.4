import React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Link from "next/link"
import { Routes } from "@blitzjs/next"
import { Typography } from "@mui/material"

export default function ImageAvatars({ user }) {
  const photo = user?.photos.length > 0 ? user.photos[0].nameFile : "/images/Artist.png"
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <Avatar alt={`${user?.firstName}${user?.lastName}`} src={photo} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div style={{ margin: "5px" }}>
          {/* {user && <Typography variant="body1">{`${user.firstName} ${user.lastName}`}</Typography>} */}
          {user && <Typography variant="body1">{`${user.name}`}</Typography>}
        </div>
        {/* {user?.Artist && (
          <Link href={Routes.MyArtistProfile({ artistId: user.Artist.id })}>
            <MenuItem onClick={handleClose}>My Profile</MenuItem>
          </Link>
        )} */}
        {/* <Link href={Routes.myAccount({ userId: user?.id })}>
          <MenuItem onClick={handleClose}>MyAccount</MenuItem>
        </Link> */}
      </Menu>
    </>
  )
}
function artistId(artistId: any): string | import("url").UrlObject {
  throw new Error("Function not implemented.")
}
