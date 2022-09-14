import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {signInWithGoogle, signIn} from '../services/auth'
import {useNavigate} from "react-router";
import {Alert, Collapse, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useState} from "react";

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

export default function SignInSide(props) {
    // const {onChange} = props;

    const navigate = useNavigate();

    function pushToHome() {
        navigate('/')
    }

    const [errorAlertOpen, setErrorAlertOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        await signIn(data.get('email'), data.get('password'))
            // .then(() => {
            //     onChange(localStorage.getItem("currentUserName"));
            // })
            .then(() => pushToHome())
            .catch((error) => {
                    setErrorMessage(error.message.substring(10));
                    setErrorAlertOpen(true);
                }
            );
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Grid container component="main" sx={{height: '80vh',marginTop:"30px"}}>
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
                            my: 8,
                            mx: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography color="primary" mt={4} mb={4} component="h1" variant="h4">
                            Sign In to Your Account
                        </Typography>
                        <Collapse in={errorAlertOpen}>
                            <Alert severity="error" sx={{mb: 2}}
                                   action={
                                       <IconButton
                                           aria-label="close"
                                           color="inherit"
                                           size="small"
                                           onClick={() => {
                                               setErrorAlertOpen(false);
                                           }}
                                       >
                                           <CloseIcon fontSize="inherit"/>
                                       </IconButton>
                                   }
                            >
                                {errorMessage}
                            </Alert>
                        </Collapse>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                color="primary"
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
                                color="primary"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                color="primary"
                                size="large"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 4}}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography color="secondary" mb={1} component='span' variant="body1">
                            You can also sign in with:
                        </Typography>
                        <Button>
                            <Avatar alt="Google" src="img/Google.png" onClick={async () => {
                                await signInWithGoogle()
                                    // .then(() => onChange(localStorage.getItem("currentUserName")))
                                    .then(() => pushToHome());
                            }}/>
                        </Button>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Link href="/forgetpwd" color="primary" fontWeight="bold">
                                Forgot password?
                            </Link>
                            <Link href="/signup" color="primary" fontWeight="bold">
                                Don't have an account? Sign Up
                            </Link>
                        </Box>
                    </Box>
                    <Copyright sx={{mt: 5}}/>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
