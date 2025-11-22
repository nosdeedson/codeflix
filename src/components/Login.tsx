import { Box, Button, FormControl, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { KeycloakProvider } from "../providers/KeycloakProviders";
import { useAuth } from "../providers/KeycloakProvidersV2";
import { useNavigate } from "react-router-dom";



const initialState = {
    password: "",
    email: ""
}

export function Login() {

    const [userInfo, setUserInfo] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const { loginWithCredentials } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setLoading(true);

        try {
            await loginWithCredentials(userInfo.email, userInfo.password);
            navigate('/categories');
        } catch (error) {
            
        }
        setUserInfo({password: '', email: ''});
        setLoading(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setUserInfo({ ...userInfo, [name]: value });
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // minHeight: '100vh'
            }}
        >
            <Box
                sx={{
                    width: 400,
                    p: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                    display: 'flex',
                    justifyContent: "center",
                    flexDirection: 'column'
                    // backgroundColor: 'white'
                }}
            >
                <Typography variant="h5" sx={{p: 1}}>
                    Welcome!
                </Typography>
                <form onSubmit={handleSubmit} >
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    name='email'
                                    label='Email'
                                    value={userInfo.email}
                                    onChange={handleChange}
                                ></TextField>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <TextField
                                    name='password'
                                    label='Senha'
                                    value={userInfo.password}
                                    onChange={handleChange}
                                ></TextField>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Button  type="submit"
                                    disabled={loading}
                                    variant='contained'
                                >
                                    {loading ? 'Logging in...' : 'Login'}
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    )
}