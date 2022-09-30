import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
import { getUserName, getUserProfile, resetPwd, signOutUser, updateUserProfile } from "../services/auth";
import { useNavigate } from "react-router";
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";


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
        black: {
            main: "#000"
        }
    },
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function SettingsPage() {

    const navigate = useNavigate();

    function pushToHome() {
        navigate('/')
    }

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const [receiveEmail, setReceiveEmail] = useState(false);

    const handleReceiveEmailChange = (event) => {
        setReceiveEmail(event.target.checked);
    }

    const [pronoun, setPronoun] = useState("he/his");

    const handleChangePronoun = (event, newPronoun) => {
        setPronoun(newPronoun);
    };

    const [bio, setBio] = useState("");

    const handleBioChange = (event) => {
        setBio(event.target.value);
    }

    const currentUserEmail = localStorage.getItem("currentUserEmail");

    useEffect(() => {
        try {
            getUserProfile(currentUserEmail).then(r => {
                if (r.user) {
                    if (r.user.bio) setBio(r.user.bio);
                    if (r.user.pronoun) setPronoun(r.user.pronoun);
                    if (r.user.receiveEmail) setReceiveEmail(r.user.receiveEmail);
                }
            });
        } catch (error) {
            console.log("An error occurred when getting user profile!", error);
        }
    }, []);

    const isEmailVerified = localStorage.getItem("emailVerified") === "true";
    const isSignedInByPwd = localStorage.getItem("providerId") === "password";

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarState, setSnackbarState] = useState("success");

    const [snackbarMsg, setSnackbarMsg] = useState("Your profile has been updated!");

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box mt={4} sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={10}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="basic tabs example">
                            <Tab label="Profile" {...a11yProps(0)} />
                            <Tab label="Security" {...a11yProps(1)} />
                            <Tab label="Notifications" {...a11yProps(2)} />
                        </Tabs>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ minHeight: "60vh" }}>
                <TabPanel value={value} index={0}>
                    <Grid container spacing={2}>
                        <Grid item xs={2} />
                        <Grid item xs={10} sx={{ display: "flex", alignItems: "center" }}>
                            <Typography color="primary" variant="h6" component="span">
                                Profile Settings
                            </Typography>
                        </Grid>
                        <Grid item xs={2} />
                        <Grid item xs={10} sx={{ display: "flex", alignItems: "center" }}>
                            <Typography color="secondary" mb={3} variant="subtitle1" component="span">
                                Change identifying details for your account
                            </Typography>
                        </Grid>
                        <Grid item xs={2} />

                        <Grid item sx={{
                            height: 'auto',
                            backgroundColor: "rgba(255,255,255,0.2)"
                        }} xs={8} component={Paper} elevation={10}>
                            <Grid item xs={12} ml={2} sx={{ display: "flex", alignItems: "center" }} p={1}>
                                <Typography color="black" fontWeight="bold" mb={3} variant="body1" component="span">
                                    Display Name
                                </Typography>
                                <Grid item xs={2} ml={3} mb={3}>
                                    <TextField
                                        variant="filled"
                                        disabled={true}
                                        color="primary"
                                        name="displayName"
                                        fullWidth
                                        id="displayName"
                                        label={localStorage.getItem("currentUserName")}
                                    />
                                </Grid>
                            </Grid>

                            {/* submit box */}
                            <Box
                                height="auto"
                                component="form"
                                noValidate
                            // onSubmit={handleSubmit}
                            >
                                <Grid item xs={12} ml={2} sx={{ display: "flex", alignItems: "center" }} p={1}>
                                    <Typography color="black" fontWeight="bold" mb={3} variant="body1">
                                        Pronoun preference
                                    </Typography>
                                    <Grid item xs={4} mb={3}>
                                        <ToggleButtonGroup
                                            color="primary"
                                            value={pronoun}
                                            exclusive
                                            onChange={handleChangePronoun}
                                        >
                                            <ToggleButton value="he/his">he/his</ToggleButton>
                                            <ToggleButton value="she/her">she/her</ToggleButton>
                                            <ToggleButton value="they/them">they/them</ToggleButton>
                                        </ToggleButtonGroup>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} ml={2} sx={{ display: "flex", justifyContent: "flex-start" }} p={1}>
                                    <Typography color="black" fontWeight="bold" mb={3} variant="body1">
                                        Bio
                                    </Typography>
                                    <Grid item xs={11} ml={3} mb={3}>
                                        <TextField
                                            fullWidth
                                            id="outlined-multiline-flexible"
                                            label="Details about yourself"
                                            multiline
                                            rows={4}
                                            value={bio}
                                            onChange={handleBioChange}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} display="flex"
                                    justifyContent="flex-end"
                                    alignItems="flex-end" mr={5} mb={3}>
                                    <Button
                                        color="primary"
                                        size="large"
                                        variant="contained"
                                        onClick={async () => {
                                            try {
                                                const res = await updateUserProfile(currentUserEmail, { bio, pronoun });
                                                setSnackbarOpen(true);
                                            } catch (error) {
                                                setSnackbarMsg("An error occurred when updating user profile!")
                                                setSnackbarState("error");
                                                setSnackbarOpen(true);
                                            }
                                        }}
                                    >
                                        Save change
                                    </Button>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={2} />
                        <Grid item xs={10} sx={{ display: "flex", alignItems: "center" }}>
                            <Typography color="primary" variant="h6" component="div">
                                Contact
                            </Typography>
                        </Grid>
                        <Grid item xs={2} />
                        <Grid item xs={10} sx={{ display: "flex", alignItems: "center" }}>
                            <Typography color="secondary" mb={3} variant="subtitle1" component="div">
                                Where we send important messages about your account
                            </Typography>
                        </Grid>
                        <Grid item xs={2} />
                        <Grid item sx={{
                            height: 'auto',
                            backgroundColor: "rgba(255,255,255,0.2)"
                        }} xs={8} component={Paper} elevation={20}>
                            <Grid item xs={12} ml={2} sx={{ display: "flex", alignItems: "center" }} p={2}>
                                <Typography color="black" fontWeight="bold" mb={3} variant="body1">
                                    Email
                                </Typography>
                                <Grid item xs={4} ml={3} mb={3}>
                                    <TextField
                                        variant="filled"
                                        disabled
                                        color="primary"
                                        autoComplete="email"
                                        name="email"
                                        fullWidth
                                        id="email"
                                        label={currentUserEmail}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} mt={5}>
                        <Grid item xs={2} />
                        <Grid item xs={10} sx={{ display: "flex", alignItems: "center" }}>
                            <Typography color="primary" variant="h6" component="div">
                                Security
                            </Typography>
                        </Grid>
                        <Grid item xs={2} />
                        <Grid item xs={10} sx={{ display: "flex", alignItems: "center" }}>
                            <Typography color="secondary" mb={3} variant="subtitle1" component="div">
                                Keep your account safe and sound
                            </Typography>
                        </Grid>
                        <Grid item xs={2} />
                        <Grid item sx={{
                            height: 'auto',
                            backgroundColor: "rgba(255,255,255,0.2)"
                        }} xs={8} component={Paper} elevation={20}>
                            {!isSignedInByPwd ?
                                <Grid item xs={12} ml={2} sx={{ display: "flex", alignItems: "center" }} p={2}>
                                    <Typography color="black" fontWeight="bold" mb={3} variant="body1">
                                        Password
                                    </Typography>
                                    <Grid item xs={12} ml={3} sx={{ display: "flex", alignItems: "center" }}>
                                        <Grid item xs={12} ml={3} sx={{ display: "flex", alignItems: "center" }}>
                                            <Typography color="secondary" fontWeight="bold" mb={3} variant="body1">
                                                You can't change your password here by logging in with Google account.
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid> : (isEmailVerified ?
                                    <Grid item xs={12} ml={2} sx={{ display: "flex", alignItems: "center" }} p={2}>
                                        <Typography color="black" fontWeight="bold" mb={3} variant="body1">
                                            Password
                                        </Typography>
                                        <Grid item xs={4} ml={3} mb={3}>
                                            <Link href="#" color="primary" fontWeight="bold"
                                                onClick={() => resetPwd(currentUserEmail).then(() => signOutUser().then(() => {
                                                    setVerificationDialogOpen(true);
                                                }))}>
                                                Change password
                                            </Link>
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
                                                        {`We've sent an email to ${currentUserEmail}, you can reset your password via the email.`}
                                                    </DialogContentText>
                                                    <DialogContentText id="alert-dialog-description">
                                                        {`If you haven't received the email, please check your spam folder.`}
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={() => {
                                                        setVerificationDialogOpen(false);
                                                        localStorage.clear();
                                                        pushToHome();
                                                    }}>OK</Button>
                                                </DialogActions>
                                            </Dialog>
                                        </Grid>
                                        <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                                            <Typography color="secondary" fontWeight="bold" mb={3} variant="body1"
                                            >
                                                Improve your security with a strong password.
                                            </Typography>
                                        </Grid>
                                    </Grid> :
                                    <Grid item xs={12} ml={2} sx={{ display: "flex", alignItems: "center" }} p={2}>
                                        <Typography color="black" fontWeight="bold" mb={3} variant="body1">
                                            Password
                                        </Typography>
                                        <Grid item xs={12} ml={3} sx={{ display: "flex", alignItems: "center" }}>
                                            <Grid item xs={12} ml={3} sx={{ display: "flex", alignItems: "center" }}>
                                                <Typography color="secondary" fontWeight="bold" mb={3} variant="body1">
                                                    You can't change your password here because you haven't verify your
                                                    email.
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>)}
                        </Grid>
                    </Grid>

                </TabPanel>

                {/* tab3 */}
                <TabPanel value={value} index={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={2} />
                        <Grid item xs={10} sx={{ display: "flex", alignItems: "center" }}>
                            <Typography color="primary" variant="h6" component="div">
                                Notifications
                            </Typography>
                        </Grid>
                        <Grid item xs={2} />
                        <Grid item xs={10} sx={{ display: "flex", alignItems: "center" }}>
                            <Typography color="secondary" mb={3} variant="subtitle1" component="div">
                                Get notifications you care about. We may notify you about updates to your account.
                            </Typography>
                        </Grid>
                        <Grid item xs={2} />

                        <Grid item sx={{
                            height: 'auto',
                            backgroundColor: "rgba(255,255,255,0.2)"
                        }} xs={8} component={Paper} elevation={20}>
                            {/* submit box */}
                            <Box
                                component="form"
                                noValidate
                            // onSubmit={handleSubmit}
                            >
                                <Grid item xs={12} ml={2} sx={{ display: "flex", alignItems: "center" }} p={2}>
                                    <Typography color="black" fontWeight="bold" mb={3} variant="body1">
                                        Message
                                    </Typography>

                                    <Grid item xs={1} mx={2} mb={3}>
                                        <Switch {...label} checked={receiveEmail} onChange={handleReceiveEmailChange} />
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography color="secondary" fontWeight="bold" mb={3} variant="body1">
                                            When turned off, you won't get any more news from us.
                                        </Typography>
                                    </Grid>

                                </Grid>
                                <Grid item display="flex"
                                    justifyContent="flex-end"
                                    alignItems="flex-end" xs={12} mr={5} mb={3}>
                                    <Button
                                        color="primary"
                                        size="large"
                                        // type="submit"
                                        variant="contained"
                                        onClick={async () => {
                                            try {
                                                const res = await updateUserProfile(currentUserEmail, { receiveEmail: receiveEmail });
                                                setSnackbarOpen(true);
                                            } catch (error) {
                                                setSnackbarMsg("An error occurred when updating user profile!");
                                                setSnackbarState("error");
                                                setSnackbarOpen(true);
                                            }
                                        }}
                                    >
                                        Save change
                                    </Button>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </TabPanel>
            </Box>

            <Snackbar anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }} open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarState} sx={{ width: '100%' }}>
                    {snackbarMsg}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}
