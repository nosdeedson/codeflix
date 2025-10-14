import { useEffect, useState } from "react";
import { Box, Container, CssBaseline, ThemeProvider, AppBar } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useAppTheme } from "../hooks/useAppTheme/useAppTheme"; // assuming your hook path
import { Header } from "./Header";
import { ResponsiveDrawer } from "./ResponsiveDrawer";
import { Outlet, useLocation } from "react-router-dom";

const drawerWidth = 240;

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentTheme, toggle] = useAppTheme();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // TODO
  // find a way to solve the problem of the sidebar
  // the scroll bar apears intermittently
  const location = useLocation();

  // TODO
  // same issue used to make the sidebar apears
  // it is a workaround
  useEffect(() => {
    // Force browser to recompute overflow height
    document.documentElement.style.overflowY = 'auto';
  }, [location]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {/* --- App Bar --- */}
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Header
            handleDrawerToggle={handleDrawerToggle}
            theme={currentTheme.palette.mode}
            toggle={toggle}
          />
        </AppBar>

        {/* --- Drawer --- */}
        <ResponsiveDrawer open={mobileOpen} onClose={handleDrawerToggle} />

        {/* --- Main Content (scrollable area) --- */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8, // spacing to push content below AppBar (Toolbar height)
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            overflowY: "auto", // makes scrollbar appear
            minHeight: "100vh",
          }}
        >
          <SnackbarProvider
            autoHideDuration={2000}
            maxSnack={3}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Container maxWidth="lg" sx={{ color: "white", mt: 1, mb: 1 }}>
              {children}
            </Container>
          </SnackbarProvider>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
