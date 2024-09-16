import React from 'react'
import { CSSObject, Theme, styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'

import { RiArrowLeftDoubleLine } from 'react-icons/ri'
import { RiArrowRightDoubleLine } from 'react-icons/ri'
import SidebarMenu from './SidebarMenu'
import logo from '../../assets/image/karizlogo.png'

interface SidebarProps {
  open: boolean
  toggleDrawer: () => void
}

type DrawerHeaderProps = {
  open: boolean
}

const drawerWidth = 300

const openedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: theme.palette.background.default,
  width: drawerWidth,
  border: 'none',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  [theme.breakpoints.down('sm')]: {
    zIndex: theme.zIndex.appBar + 1000,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
})

const closedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: theme.palette.background.default,
  border: 'none',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const CustomDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const DrawerHeader = styled('div')<DrawerHeaderProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

const Sidebar: React.FC<SidebarProps> = ({ open, toggleDrawer }) => {
  return (
    <CustomDrawer variant="permanent" open={open}>
      <DrawerHeader open={open}>
        {open && <img src={logo} alt="Kariz Logo" />}
        <IconButton onClick={toggleDrawer}>{open ? <RiArrowRightDoubleLine /> : <RiArrowLeftDoubleLine />}</IconButton>
      </DrawerHeader>
      <SidebarMenu open={open} />
    </CustomDrawer>
  )
}

export default Sidebar
