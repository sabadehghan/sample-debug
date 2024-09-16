import { MENU_LIST, MenuType } from '@/config'
import useServices from '@/hooks/useServices'
import { ServicesType } from '@/services/servicesServices'
import { theme } from '@/themes/mui'
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { styled } from '@mui/material'

interface SidebarMenuProps {
  open: boolean
}
const CustomListItemButton = styled(ListItemButton)(() => ({
  '&:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '25px',
    height: '35%',
    borderBottom: `1px solid #8C9197`,
    borderLeft: `1px solid #8C9197`,
    borderBottomLeftRadius: 7,
    transform: 'translateY(50%)',
  },
}))
const CustomCollapse = styled(Collapse)(() => ({
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '-61%',
    left: 32,
    width: 1,
    height: '100%',
    backgroundColor: '#8C9197',
    borderBottomLeftRadius: 7,
  },
}))

const SidebarMenu: React.FC<SidebarMenuProps> = ({ open }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { docsName } = useParams()

  const [openMenus, setOpenMenus] = React.useState<string[]>(MENU_LIST.map((menu) => menu.name))

  const { serviceQuery } = useServices()
  const { data: servicesData, isLoading } = serviceQuery

  const handleMenuClick = (item: MenuType) => {
    if (item.isNested) {
      if (openMenus.includes(item.name)) {
        setOpenMenus((prev) => prev.filter((menuName) => menuName !== item.name))
      } else {
        setOpenMenus((prev) => [...prev, item.name])
      }
    } else {
      navigate(item.path)
    }
  }
  return (
    <List sx={{ display: 'flex', flexDirection: 'column' }}>
      {MENU_LIST.map((item) => (
        <div key={item.name}>
          <ListItem disablePadding sx={{ ...(open ? { px: 2 } : { px: 0.8 }), zIndex: 1, my: 1 }}>
            <ListItemButton
              onClick={() => handleMenuClick(item)}
              selected={location.pathname.includes(item.path)}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                borderRadius: 2.5,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  boxShadow: '0px 4px 4px 0px rgba(26, 39, 163, 0.38)',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: theme.palette.primary.main,
                },
              }}>
              <ListItemIcon
                sx={{ ...(location.pathname.includes(item.path) && { color: 'white' }), py: 0.7, minWidth: 'auto' }}>
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText sx={{ textAlign: 'center' }} primary={item.title} />}
              {item.isNested && (openMenus.includes(item.name) ? <MdExpandLess /> : <MdExpandMore />)}
            </ListItemButton>
          </ListItem>
          {open &&
            item.name === 'docs' &&
            !isLoading &&
            servicesData &&
            servicesData.result.resources.map((service: ServicesType) => (
              <CustomCollapse key={service.name} in={openMenus.includes(item.name)} timeout="auto" unmountOnExit>
                <ListItem key={item.name} disablePadding sx={{ px: 2, pl: 4, my: 0.2 }}>
                  <CustomListItemButton
                    onClick={() => navigate(`/docs/${service.name}`)}
                    selected={docsName === service.name}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      borderRadius: 2.5,
                      '&.Mui-selected': {
                        backgroundColor: 'unset',
                        color: theme.palette.primary.main,
                      },
                      '&.Mui-selected:hover': {
                        backgroundColor: 'unset',
                      },
                      '& .MuiTypography-root': {
                        ...(docsName === service.name && { fontWeight: 700 }),
                      },
                    }}>
                    <ListItemText primary={service.label || service.name} sx={{ marginLeft: '18px' }} />
                  </CustomListItemButton>
                </ListItem>
              </CustomCollapse>
            ))}
        </div>
      ))}
    </List>
  )
}

export default SidebarMenu
