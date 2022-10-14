import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { register } from "../services/auth";
import { useNavigate } from "react-router";
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
import { useState } from "react";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import TermsAndConditions from "../components/TermsAndConditions";
import PrivacyPolicy from '../components/PrivacyPolicy';

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
                        color: "#52BD66",
                        cursor: "pointer"
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
    // term
    const [termsDialogOpen, setTermsDialogOpen] = React.useState(false);
    const [termsScroll, setTermsScroll] = React.useState('paper');

    const handleClickTermsDialogOpen = (scrollType) => () => {
        setTermsDialogOpen(true);
        setTermsScroll(scrollType);
    };

    const handleTermsDialogClose = () => {
        setTermsDialogOpen(false);
    };
    //privacy
    const [privacyDialogOpen, setPrivacyDialogOpen] = React.useState(false);
    const [privacyScroll, setPrivacyScroll] = React.useState('paper');

    const handleClickPrivacyDialogOpen = (scrollType) => () => {
        setPrivacyDialogOpen(true);
        setPrivacyScroll(scrollType);
    };

    const handlePrivacyDialogClose = () => {
        setPrivacyDialogOpen(false);
    };

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
                    setVerificationMessage(`We've sent an email to ${email}, you can verify your email address now. If you haven't received the email, please check your spam folder.`);
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
            <CssBaseline />
            <Box
                sx={{
                    pb: 6,
                    mt: 5,
                    display: 'flex',
                    justifyContent: "center"
                }}
            >

                <Box sx={{ width: 580 }} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 5,
                            mx: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography color="primary" mt={2} mb={2} component="h1" variant="h4">
                            Create Account
                        </Typography>
                        <Collapse in={errorAlertOpen}>
                            <Alert severity="error"
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setErrorAlertOpen(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
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
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
                                        control={<Checkbox name="receiveEmail" color="primary" />}
                                        label="I want to receive inspiration and updates via email."
                                    />
                                    {/* term */}
                                    <Dialog
                                        open={termsDialogOpen}
                                        onClose={handleTermsDialogClose}
                                        scroll={termsScroll}
                                        aria-labelledby="scroll-dialog-title"
                                        aria-describedby="scroll-dialog-description"
                                    >
                                        <DialogTitle color="primary" id="scroll-dialog-title">MOBILE APP TERMS AND CONDITIONS OF USE - SERVICES</DialogTitle>
                                        <DialogContent dividers={termsScroll === 'paper'}>
                                            <DialogContentText
                                                id="scroll-dialog-description"
                                                tabIndex={-1}
                                                color="black"
                                            >
                                                PLEASE READ THESE TERMS AND CONDITIONS ('TERMS') CAREFULLY BEFORE USING THE APPLICATION
                                                <TermsAndConditions />
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleTermsDialogClose}>Confirm</Button>
                                        </DialogActions>
                                    </Dialog>

                                    {/* privacy */}
                                    <Dialog
                                        open={privacyDialogOpen}
                                        onClose={handlePrivacyDialogClose}
                                        scroll={privacyScroll}
                                        aria-labelledby="scroll-dialog-title"
                                        aria-describedby="scroll-dialog-description"
                                    >
                                        <DialogTitle color="primary" id="scroll-dialog-title">Privacy policy</DialogTitle>
                                        <DialogContent dividers={privacyScroll === 'paper'}>
                                            <DialogContentText
                                                id="scroll-dialog-description"
                                                tabIndex={-1}
                                                color="black"
                                            >
                                            <PrivacyPolicy />
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handlePrivacyDialogClose}>Confirm</Button>
                                        </DialogActions>
                                    </Dialog>
                                    <Typography component='div' sx={{ ml: 1 }} color="secondary" align="left">
                                        By <Box component="span" fontWeight='bold'>Creating an account</Box>, you agree that you've read and accepted our <Link onClick={handleClickTermsDialogOpen('paper')}>Terms & Conditions</Link>, and you consent to <Link onClick={handleClickPrivacyDialogOpen('paper')}>Privacy Policy</Link> from us.
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Button
                                color="primary"
                                size="large"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
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
                    <Copyright sx={{ mt: 5 }} />
                </Box>
                <Card
                    sx={{
                        width: 660,
                        height: 720,
                        borderRadius: 1,
                    }}
                >
                    <CardMedia
                        component="img"
                        image='img/signup.jpg'
                        alt="signup"
                    />
                </Card>
            </Box>

        </ThemeProvider>
    );
}
