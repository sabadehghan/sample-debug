import React, { useState } from 'react'
import { AppBarProps, AppBar as MuiAppBar, Menu, MenuItem, Toolbar, IconButton, Badge } from '@mui/material'
import { styled } from '@mui/material/styles'
import { PiUser } from 'react-icons/pi'
import { VscBell } from 'react-icons/vsc'
import LogOutDialog from './LogOutDialog'

interface HeaderProps {
  open: boolean
}

interface CustomAppBarProps extends AppBarProps {
  open: boolean
}

const drawerWidth = 240

const CustomAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<CustomAppBarProps>(({ theme, open }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: 'none',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(!open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${theme.spacing(7)})`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${theme.spacing(8.1)})`,
    },
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Header: React.FC<HeaderProps> = ({ open }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false)
  const userOpen = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <CustomAppBar position="fixed" open={open}>
        <Toolbar dir="ltr">
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <IconButton sx={{ backgroundColor: 'white', color: 'black' }} onClick={handleClick}>
              <PiUser />
            </IconButton>
            <Menu sx={{ mt: 1 }} anchorEl={anchorEl} open={userOpen} onClose={handleClose}>
              <MenuItem onClick={() => setOpenLogoutDialog(true)}>خروج</MenuItem>
            </Menu>
            <Badge
              badgeContent={4}
              color="primary"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}>
              <VscBell size={26} color="black" />
            </Badge>
          </div>
        </Toolbar>
      </CustomAppBar>
      <LogOutDialog open={openLogoutDialog} onClose={() => setOpenLogoutDialog(false)} />
    </>
  )
}

export default Header
