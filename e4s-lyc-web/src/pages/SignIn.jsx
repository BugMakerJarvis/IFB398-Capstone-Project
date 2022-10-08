import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signInWithGoogle, signIn, resetPwd, forgetPwd, getUserProfile } from '../services/auth'
import { useNavigate } from "react-router";
import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { collection, getFirestore, query, where, getDocs, doc, setDoc, updateDoc, addDoc } from "firebase/firestore";

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

export default function SignInSide(props) {
    // const [loading, setLoading] = React.useState(true);
    // function handleClick() {
    //     setLoading(true);
    // }
    // const {onChange} = props;
    const [forgetPasswordDialogOpen, setForgetPasswordDialogOpen] = useState(false);

    const navigate = useNavigate();

    function pushToHome() {
        navigate('/')
    }

    const [emailForPassword, setEmailForPassword] = useState();

    const [emailError, setEmailError] = useState();

    const [switchDialog, setSwitchDialog] = useState(1);

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
            <CssBaseline />
            <Box
                sx={{
                    pb: 6,
                    mt: 5,
                    display: 'flex',
                    justifyContent: "center"
                }}
            >
                <Card
                    sx={{
                        width: 660,
                        height: 720,
                        borderRadius: 1,
                    }}
                >
                    <CardMedia
                        component="img"
                        image='img/High-Performance-Workshops-1.jpg'
                        alt="signin"
                    />
                </Card>
                <Box sx={{ width: 580 }} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 10,
                            mx: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography color="primary" mt={3} mb={3} component="h1" variant="h4">
                            Sign In to Your Account
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
                        <Box
                            component="form"
                            noValidate onSubmit={handleSubmit}
                            sx={{ mt: 1 }}>
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
                                sx={{ mt: 1 }}
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
                        {/* <Typography color="secondary" component='span' variant="body1">
                            You can also sign in with:
                        </Typography> */}
                        {/* <Button>
                            <Avatar alt="Google" src="img/Google.png" onClick={async () => {
                                await signInWithGoogle()
                                    // .then(() => onChange(localStorage.getItem("currentUserName")))
                                    .then(() => {
                                        getUserProfile(localStorage.getItem("currentUserEmail")).then((res) => {
                                            if (JSON.stringify(res.user) === "{}") {
                                                addDoc(collection(getFirestore(), 'userProfile'), { email: localStorage.getItem("currentUserEmail") });
                                            }
                                        })
                                        pushToHome()
                                    });
                            }} />
                        </Button> */}
                        <Link onClick={() => setForgetPasswordDialogOpen(true)} color="primary" fontWeight="bold">
                            Forgot password?
                        </Link>
                        {switchDialog === 1 ?
                            <Dialog
                                open={forgetPasswordDialogOpen}
                                onClose={() => setForgetPasswordDialogOpen(false)}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle color="primary">Forget your password?</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        To get back into your account, please enter your email address here. We'll send you an email to change your password.
                                    </DialogContentText>
                                    <TextField
                                        value={emailForPassword}
                                        onChange={(event) => {
                                            const { value } = event.target;
                                            // correct email format
                                            if (
                                                /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
                                                    value
                                                )
                                            ) {
                                                setEmailError(null);
                                            } else {
                                                setEmailError("Please enter the correct email format");
                                            }
                                            setEmailForPassword(value);
                                        }}
                                        autoFocus
                                        margin="dense"
                                        id="email-for-passward"
                                        label="Email Address"
                                        type="email"
                                        fullWidth
                                        variant="standard"
                                    />
                                    {emailError != null ? <DialogContentText color="error">{emailError}</DialogContentText> : null}
                                </DialogContent>
                                <DialogActions>
                                    <Button color='secondary'
                                        onClick={() => {
                                            setForgetPasswordDialogOpen(false);
                                            setEmailForPassword("");
                                            setEmailError("");
                                        }}>
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={async () => {
                                            try {
                                                await forgetPwd(emailForPassword);
                                                setSwitchDialog(2);
                                            } catch (error) {
                                                setEmailError("User not found")
                                            }
                                        }}
                                        disabled={emailError !== null}
                                    >Submit</Button>
                                </DialogActions>
                            </Dialog>
                            :
                            <Dialog
                                open={forgetPasswordDialogOpen}
                                onClose={() => setForgetPasswordDialogOpen(false)}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Email Verification"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        {`We've sent an email to ${emailForPassword}, you can reset your password via the email.`}
                                    </DialogContentText>
                                    <DialogContentText id="alert-dialog-description">
                                        {`If you haven't received the email, please check your spam folder.`}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={() => {
                                            setForgetPasswordDialogOpen(false);
                                            setSwitchDialog(1);
                                            setEmailForPassword("");
                                            setEmailError("");
                                        }}
                                    >OK</Button>
                                </DialogActions>
                            </Dialog>
                        }

                        <Link sx={{ mt: 2 }} href="/signup" color="primary" fontWeight="bold">
                            Don't have an account? Sign Up
                        </Link>
                    </Box>
                    <Copyright sx={{ mt: 12 }} />
                </Box>
            </Box>
        </ThemeProvider >

    );
}
