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
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {register} from "../services/auth";
import {useNavigate} from "react-router";
import {
    Alert,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useState} from "react";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
} from 'firebase/firestore';
import {getAuth} from "firebase/auth";

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

export default function SignUpSide() {

    const navigate = useNavigate();

    function pushToHome() {
        navigate('/')
    }

    const [errorAlertOpen, setErrorAlertOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);
    const [verificationMessage, setVerificationMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");
        const firstName = data.get("firstName");
        const lastName = data.get("lastName");
        if (data.get("firstName") === "" || data.get("lastName") === "") {
            setErrorMessage("Error (auth/name-required).");
            setErrorAlertOpen(true);
        } else {
            await register(email, password, firstName, lastName)
                .then(async (userCredential) => {
                    await addDoc(collection(getFirestore(), 'userProfile'), {
                        uid: userCredential.user.uid,
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                        receiveEmail: data.get("receiveEmail") === "on",
                        createTimeStamp: serverTimestamp()
                    });
                }).then(() => {
                    localStorage.setItem("currentUserName", `${firstName} ${lastName}`)
                })
                .then(() => {
                    setVerificationMessage(`We've sent an email to ${email}, you can verify your email address now.`);
                    setVerificationDialogOpen(true);
                })
                .catch((error) => {
                        setErrorMessage(error.message);
                        setErrorAlertOpen(true);
                    }
                );
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '80vh',marginTop:"30px"}}>
                <CssBaseline/>
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
                        <Dialog
                            open={verificationDialogOpen}
                            onClose={() => setVerificationDialogOpen(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Email Verification"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {verificationMessage}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => {
                                    setVerificationDialogOpen(false);
                                    pushToHome();
                                }}>OK</Button>
                            </DialogActions>
                        </Dialog>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
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
                                        control={<Checkbox name="receiveEmail" color="primary"/>}
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
                                sx={{mt: 4, mb: 2}}
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
