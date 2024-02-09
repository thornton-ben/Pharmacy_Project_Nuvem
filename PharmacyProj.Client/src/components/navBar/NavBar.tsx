import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Link from "@mui/material/Link"
import "./NavBar.css"

export default function NavBar() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="nav-bar">
            <Link color="inherit" href="/">
              Pharmacy
            </Link>
            &nbsp;
            <Link color="inherit" href="/delivery">
              Delivery
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}
