import React, { useState } from "react"
import { AppBar, IconButton, Menu, MenuItem, Fade } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MenuIcon from "@material-ui/icons/Menu"
import CloseIcon from "@material-ui/icons/Close"
import DarkModeToggle from "../DarkModeToggle"
import SiteLogo from "../SiteLogo"
import "styled-components/macro"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const openMenu = () => setMenuOpen(true)
  const closeMenu = () => setMenuOpen(false)

  const menuStyles = makeStyles(() => ({
    popoverRoot: {
      zIndex: "0 !important",
      height: "100%",
    },
    popoverPaper: {
      width: "100%",
      maxWidth: "100%",
      height: "100%",
      left: 0,
      top: 0,
    },
    menuPaper: {
      width: "100%",
      height: "100vh",
      left: "0 !important",
      top: "0 !important",
      maxHeight: "40vh",
      paddingTop: "65px",
      background: "var(--bg)",
    },
    menuItem: {
      display: "flex",
      justifyContent: "center",
      fontFamily: "unset",
      fontSize: "unset",
    },
    centerVert: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },
    noBoxShadow: {
      boxShadow: "none !important",
    },
  }))

  const styles = menuStyles()

  return (
    <AppBar
      elevation={null}
      style={{
        display: "flex",
        padding: "0.2em 0.2em 0",
        flexDirection: "row",
        background: "var(--bg)",
        height: 55,
      }}
    >
      <div
        className={styles.centerVert}
        style={{
          padding: "12px",
          transform: "scale(0.9) translateY(2px)",
        }}
      >
        <DarkModeToggle />
      </div>
      <div style={{ flexGrow: 1 }}></div>
      <div
        className={styles.centerVert}
        style={{
          transform: "scale(0.55)",
        }}
      >
        <SiteLogo />
      </div>
      <div style={{ flexGrow: 1 }}></div>
      {!menuOpen ? (
        <IconButton
          onClick={openMenu}
          style={{
            transform: "translateY(-1px)",
            color: "var(--logo)",
          }}
        >
          <MenuIcon style={{ height: 24 }} />
        </IconButton>
      ) : (
        <IconButton
          onClick={closeMenu}
          style={{
            transform: "translateY(-1px)",
            color: "var(--logo)",
          }}
        >
          <CloseIcon style={{ height: 24 }} />
        </IconButton>
      )}
      <Menu
        style={{ width: "100%", display: "flex", flexDirection: "column" }}
        hideBackdrop={true}
        transitioncomponent={Fade}
        elevation={0}
        open={menuOpen}
        PopoverClasses={{
          root: styles.popoverRoot,
          paper: styles.popoverPaper,
        }}
        PaperProps={{ classes: { root: styles.noBoxShadow } }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        getContentAnchorEl={null}
        classes={{ paper: styles.menuPaper }}
      >
        <MenuItem className={styles.menuItem}>
          <a href="/">Home</a>
        </MenuItem>
        <MenuItem className={styles.menuItem}>
          <a href="/about">About</a>
        </MenuItem>
        <MenuItem className={styles.menuItem}>
          <a href="/tags">Tags</a>
        </MenuItem>
        <MenuItem className={styles.menuItem}>
          <a href="/Search">Search</a>
        </MenuItem>
      </Menu>
    </AppBar>
  )
}

export default Navbar
