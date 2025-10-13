import { AppBar, Box, Container, CssBaseline, Snackbar, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack';
import React, { useState } from 'react'
import { useAppTheme } from '../hooks/useAppTheme/useAppTheme';
import { Header } from './Header';
import { ResponsiveDrawer } from './ResponsiveDrawer';

const drawerWidth = 240;

export function Layout({children}: {children : React.ReactNode}) {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentTheme, toggle] = useAppTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline/>
      <Box sx={{display: 'flex'}}>
        <AppBar
          position='fixed'
          sx={{
            width: {sm: `calc(100% - ${drawerWidth}px)`},
            ml: {sm: `${drawerWidth}`},
          }}
        >
          <Header
          handleDrawerToggle={handleDrawerToggle}
          theme={currentTheme.palette.mode}
          toggle={toggle}
          />
          <ResponsiveDrawer open={mobileOpen} onClose={handleDrawerToggle}/>
          <SnackbarProvider
            autoHideDuration={2000}
            maxSnack={3}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
          >
            <Container
              maxWidth='lg' sx={{color: 'white', my: 0.5, border: 'solid 1px'}}
            >
              {children}
            </Container>
          </SnackbarProvider>
        </AppBar>

      </Box>
    </ThemeProvider>
  )
}


