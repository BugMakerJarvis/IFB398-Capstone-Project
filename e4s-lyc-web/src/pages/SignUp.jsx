import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { isUserSignedIn, register, updateUserProfile } from "../services/auth";
import { useNavigate } from "react-router";

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
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: "none",
                    ":hover": {
                        textDecoration: "underline",
                        color: "#52BD66"
                    },
                },
            },
        },
    },
    palette: {
        primary: {
            main: '#52BD66',
            contrastText: '#fff',
        },
        secondary: {
            main: '#9A9A9A',
        },
    },
});

export default function SignUpSide(props) {
    const { onChange } = props;

    const navigate = useNavigate();

    function pushToHome() {
        navigate('/')
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            await register(data.get('email'), data.get('password'))
                .then(() => {
                    onChange(localStorage.getItem("currentUserEmail"));
                })
                .then(() => pushToHome());
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '80vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={4} ml={30} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography color="primary" mb={4} component="h1" variant="h4">
                            Create Account
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        color="primary"
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        color="primary"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        color="primary"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        color="primary"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration and updates via email."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                color="primary"
                                size="large"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 4, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="center" mt={2}>
                                <Grid item>
                                    <Link href="/signin" color="primary" fontWeight="bold">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    component={Paper}
                    xs={false}
                    sm={7}
                    md={4.5}
                    sx={{
                        // backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundImage: 'url(img/IMG20210510162140.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
        </ThemeProvider>
    );
}
