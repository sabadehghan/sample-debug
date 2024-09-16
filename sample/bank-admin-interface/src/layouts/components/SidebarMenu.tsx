import { MENU_LIST } from "@/config"
import { theme } from "@/themes/mui"
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

interface SidebarMenuProps {
    open: boolean
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ open }) => {
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <List>
            {MENU_LIST.map((item) => (
                <ListItem key={item.name} disablePadding sx={{ ...(open ? { px: 2 } : { px: 0.8 }), my: 1 }}>
                    <ListItemButton
                        onClick={() => navigate(item.path)}
                        selected={location.pathname === item.path}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            borderRadius: 2.5,
                            '&.Mui-selected': {
                                backgroundColor: theme.palette.primary.main,
                                color: 'white',
                            },
                            '&.Mui-selected:hover': {
                                backgroundColor: theme.palette.primary.main,
                            },
                        }}>
                        <ListItemIcon sx={{ ...(location.pathname === item.path && { color: 'white' }), py: 0.7, minWidth: 'auto' }}>
                            {item.icon}
                        </ListItemIcon>
                        {open && <ListItemText
                            sx={{ textAlign: 'center' }}
                            primary={item.title}
                        />}
                    </ListItemButton>
                </ListItem>
            ))
            }
        </List >
    )
}

export default SidebarMenu