import React, { useEffect, useState } from "react"
import { Box, Container, useMediaQuery } from "@mui/material"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import { theme } from "@/themes/mui"

interface MainLayoutProps {
    children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const toggleDrawerHandler = () => setIsMenuOpen((prev) => !prev)
    const isDesktop = useMediaQuery('(min-width:600px)')

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        setIsMenuOpen(isDesktop)
    }, [isDesktop])

    return (
        isMounted && (
            <Container sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'row', pl: '0px !important' }} maxWidth={false}>
                <Sidebar open={isMenuOpen} toggleDrawer={toggleDrawerHandler} />
                <Box component="main" sx={{ width: `calc(100% - ${isMenuOpen ? `${240}px` : theme.spacing(7)})`, pl: 1 }}>
                    <Header open={isMenuOpen} />
                    <Box sx={{ height: '100%', pt: 8, pb: 1.5 }}>
                        {children}
                    </Box>
                </Box>
            </Container >
        ))
}


export default MainLayout