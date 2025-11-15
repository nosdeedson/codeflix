import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { useAppSelector } from '../app/hooks';
import { selectIsAuthenticated } from '../features/auth/authSlice';
import { keycloak } from '../keycloakConfig';

type Props = {
  toggle: () => void;
  theme: string;
  handleDrawerToggle: () => void
}

export function Header({
  handleDrawerToggle,
  theme,
  toggle
}: Props) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  console.log(isAuthenticated);
  return (
    <Box >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        <IconButton sx={{ ml: 1 }} onClick={toggle} color="inherit">
          {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        { isAuthenticated && (
          <IconButton
            color="inherit"
            onClick={() => keycloak.login()}
          >
            <LoginIcon/>
          </IconButton>
        )}
        { !isAuthenticated && (
          <IconButton
            color="inherit"
            onClick={() => keycloak.logout()}
          >
            <LogoutIcon/>
          </IconButton>
        )}
      </Toolbar>
    </Box>
  )
}
