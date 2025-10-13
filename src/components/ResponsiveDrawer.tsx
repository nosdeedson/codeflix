import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const drawerWidth = 240;

type Props = {
    open: boolean;
    onClose: () => void;
}

export function ResponsiveDrawer({
    open,
    onClose
}: Props) {

    const routes = [
        { path: "/", name: "Categories" },
        { path: "/cast-members", name: "Cast Members" },
        { path: "/genres", name: "Genres" },
        { path: "/videos", name: "Videos" },
    ];

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant='h6' component='div'>
                    Codeflix
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {routes.map((route) => (
                    <Link
                        key={route.path}
                        to={route.path}
                        onClick={onClose}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText>{route.name}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='temporary'
                open={open}
                onClose={onClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>

            <Drawer
                variant='permanent'
                open
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                        backgroundColor: "background.default",
                    },
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
}