import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {signInWithGoogle, signInWithFacebook, signIn, isUserSignedIn} from '../services/auth'
import {useEffect, useState} from "react";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://elements4success.com.au/">
                E4S
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#0971f1',
            darker: '#053e85',
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
});

export default function SignInSide() {

    const [currentUserFirstName, setCurrentUserFirstName] = useState();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const res = await signIn(data.get('email'), data.get('password'));
        console.log(res);
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '80vh'}}>
                <CssBaseline/>
                <Grid
                    component={Paper}
                    item
                    xs={false}
                    sm={4}
                    md={4.5}
                    sx={{
                        ml: 30,
                        // backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundImage: 'url(img/High-Performance-Workshops-1.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 12,
                            mx: 8,
                            color: "#52BD66",
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography mb={2} component="h1" variant="h4">
                            Sign In to Your Account
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                color='success'
                                size="large"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3}}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            color: "#9A9A9A",
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography mb={1} component="p" variant="p">
                            You can also sign in with:
                        </Typography>
                        <Avatar alt="Google" src="img/Google.png" onClick={signInWithGoogle}/>

                        <Link href="#" variant="p"
                              mt={2} underline="hover" color="black" fontWeight="bold">
                            Forgot password?
                        </Link>

                        <Link href="/signup" variant="p"
                              underline="hover" color="black" fontWeight="bold">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Box>
                    <Copyright sx={{mt: 5}}/>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
