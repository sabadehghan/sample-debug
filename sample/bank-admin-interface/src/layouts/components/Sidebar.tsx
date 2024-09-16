import React from "react"
import { CSSObject, Theme, styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'

import { RiArrowLeftDoubleLine } from 'react-icons/ri'
import { RiArrowRightDoubleLine } from 'react-icons/ri'
import { Typography } from "@mui/material"
import SidebarMenu from "./SidebarMenu"

interface SidebarProps {
    open: boolean
    toggleDrawer: () => void
}

type DrawerHeaderProps = {
    open: boolean
}

const drawerWidth = 240

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
    width: `calc(${theme.spacing(7)} + 1px)`,
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


const DrawerHeader = styled('div')<DrawerHeaderProps>(({ theme, open }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: open ? 'flex-end' : 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}))

const Sidebar: React.FC<SidebarProps> = ({ open, toggleDrawer }) => {
    return (
        <CustomDrawer variant="permanent" open={open}>
            <DrawerHeader open={open}>
                {open && (
                    <Typography dir="ltr" sx={{ flexGrow: 1, textAlign: 'right', mr: 1 }} variant="h6" noWrap>
                        Kariz +
                    </Typography>
                )}
                <IconButton onClick={toggleDrawer}>{open ? (
                    <RiArrowRightDoubleLine />) : <RiArrowLeftDoubleLine />}</IconButton>
            </DrawerHeader>
            <SidebarMenu open={open} />
        </CustomDrawer>
    )
}

export default Sidebar