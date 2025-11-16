import { Box, Button, FormControl, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { keycloak } from "../keycloakConfig";

const initialState = {
    password: "",
    email: ""
}

export function Login() {

    const [userInfo, setUserInfo] = useState(initialState);

    // async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    //     try {
    //         await keycloak.login({
    //             username: userInfo.email,
    //             password: userInfo.password,

    //         })
    //     } catch (error) {
            
    //     }
    //     setUserInfo({password: '', email: ''})
    // }

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
                <form >
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
                                <Button onClick={() => keycloak.login({redirectUri: "http://localhost:3000/categories"})}
                                    variant='contained'
                                >
                                    Login
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    )
}