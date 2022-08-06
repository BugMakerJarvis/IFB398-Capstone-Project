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
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Button from "@mui/material/Button";
import {getUserName, getUserProfile, resetPwd, signOutUser} from "../services/auth";
import {useNavigate} from "react-router";
import {Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useEffect, useState} from "react";


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
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
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

    const [pronoun, setPronoun] = useState('');

    const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);

    const handlePronounChange = (event) => {
        setPronoun(event.target.value);
    };

    const label = {inputProps: {'aria-label': 'Switch demo'}};

    const [receiveEmail, setReceiveEmail] = useState(true);

    useEffect(() => {
        try {
            getUserProfile(localStorage.getItem("currentUserEmail")).then(r => {
                setReceiveEmail(r.receiveEmail);
                if (r.pronoun) {
                    setPronoun(r.pronoun);
                }
            });
        } catch (error) {
            console.log("An error occurred when sending password reset email!", error);
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{width: '100%'}}>
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

            <Box sx={{minHeight: "60vh"}}>
                <TabPanel value={value} index={0}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}/>
                        <Grid item xs={10} sx={{display: "flex", alignItems: "center"}}>
                            <Typography color="primary" variant="h6" component="span">
                                Profile Settings
                            </Typography>
                        </Grid>
                        <Grid item xs={2}/>
                        <Grid item xs={10} sx={{display: "flex", alignItems: "center"}}>
                            <Typography color="secondary" mb={3} variant="subtitle1" component="span">
                                Change identifying details for your account
                            </Typography>
                        </Grid>
                        <Grid item xs={2}/>

                        <Grid item sx={{
                            height: 'auto',
                            backgroundColor: "rgba(255,255,255,0.2)"
                        }} xs={8} component={Paper} elevation={20}>
                            <Grid item xs={12} ml={2} sx={{display: "flex", alignItems: "center"}} p={1}>
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
                                component="form"
                                noValidate
                                // onSubmit={handleSubmit}
                            >
                                <Grid item xs={12} ml={2} sx={{display: "flex", alignItems: "center"}} p={1}>
                                    <Typography color="black" fontWeight="bold" mb={3} variant="body1">
                                        Pronoun preference
                                    </Typography>
                                    <Grid item xs={2} ml={3} mb={3}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Pronoun</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={pronoun}
                                                label="Pronoun"
                                                onChange={handlePronounChange}
                                            >
                                                <MenuItem value={1}>he/his</MenuItem>
                                                <MenuItem value={2}>she/her</MenuItem>
                                                <MenuItem value={3}>they/them</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid item xs={2} ml={1} mb={3}>
                                    <Button
                                        color="primary"
                                        size="large"
                                        // type="submit"
                                        variant="contained"
                                        onClick={() => {
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
                        <Grid item xs={2}/>
                        <Grid item xs={10} sx={{display: "flex", alignItems: "center"}}>
                            <Typography color="primary" variant="h6" component="div">
                                Contact
                            </Typography>
                        </Grid>
                        <Grid item xs={2}/>
                        <Grid item xs={10} sx={{display: "flex", alignItems: "center"}}>
                            <Typography color="secondary" mb={3} variant="subtitle1" component="div">
                                Where we send important messages about your account
                            </Typography>
                        </Grid>
                        <Grid item xs={2}/>
                        <Grid item sx={{
                            height: 'auto',
                            backgroundColor: "rgba(255,255,255,0.2)"
                        }} xs={8} component={Paper} elevation={20}>
                            <Grid item xs={12} ml={2} sx={{display: "flex", alignItems: "center"}} p={2}>
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
                                        label={localStorage.getItem("currentUserEmail")}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {localStorage.getItem("emailVerified") === "true" && localStorage.getItem("providerId") === "password" ?
                        <Grid container spacing={2} mt={5}>
                            <Grid item xs={2}/>
                            <Grid item xs={10} sx={{display: "flex", alignItems: "center"}}>
                                <Typography color="primary" variant="h6" component="div">
                                    Security
                                </Typography>
                            </Grid>
                            <Grid item xs={2}/>
                            <Grid item xs={10} sx={{display: "flex", alignItems: "center"}}>
                                <Typography color="secondary" mb={3} variant="subtitle1" component="div">
                                    Keep your account safe and sound
                                </Typography>
                            </Grid>
                            <Grid item xs={2}/>
                            <Grid item sx={{
                                height: 'auto',
                                backgroundColor: "rgba(255,255,255,0.2)"
                            }} xs={8} component={Paper} elevation={20}>
                                <Grid item xs={12} ml={2} sx={{display: "flex", alignItems: "center"}} p={2}>
                                    <Typography color="black" fontWeight="bold" mb={3} variant="body1">
                                        Password
                                    </Typography>
                                    <Grid item xs={4} ml={3} mb={3}>
                                        <Link href="#" color="primary" fontWeight="bold"
                                              onClick={() => resetPwd(localStorage.getItem("currentUserEmail")).then(() => signOutUser().then(() => {
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
                                                    {`We've sent an email to ${localStorage.getItem("currentUserEmail")}, you can reset your password via the email.`}
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
                                    <Grid item xs={12} sx={{display: "flex", alignItems: "center"}}>
                                        <Typography color="secondary" fontWeight="bold" mb={3} variant="body1"
                                        >
                                            Improve your security with a strong password.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid> :
                        <Grid container spacing={2} mt={5}>
                            <Grid item xs={2}/>
                            <Grid item xs={10} sx={{display: "flex", alignItems: "center"}}>
                                <Typography color="primary" variant="h6">
                                    Security
                                </Typography>
                            </Grid>
                            <Grid item xs={2}/>
                            <Grid item xs={10} sx={{display: "flex", alignItems: "center"}}>
                                <Typography color="secondary" mb={3} variant="subtitle1">
                                    Keep your account safe and sound
                                </Typography>
                            </Grid>
                            <Grid item xs={2}/>
                            <Grid item sx={{
                                height: 'auto',
                                backgroundColor: "rgba(255,255,255,0.2)"
                            }} xs={8} component={Paper} elevation={20}>
                                <Grid item xs={12} ml={2} sx={{display: "flex", alignItems: "center"}} p={2}>
                                    <Typography color="black" fontWeight="bold" mb={3} variant="body1">
                                        Password
                                    </Typography>
                                    <Grid item xs={12} ml={3} sx={{display: "flex", alignItems: "center"}}>
                                        <Typography color="secondary" fontWeight="bold" mb={3} variant="body1">
                                            You can't change your password here by logging in with Google account.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    }

                </TabPanel>

                {/* tab3 */}
                <TabPanel value={value} index={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}/>
                        <Grid item xs={10} sx={{display: "flex", alignItems: "center"}}>
                            <Typography color="primary" variant="h6" component="div">
                                Notifications
                            </Typography>
                        </Grid>
                        <Grid item xs={2}/>
                        <Grid item xs={10} sx={{display: "flex", alignItems: "center"}}>
                            <Typography color="secondary" mb={3} variant="subtitle1" component="div">
                                Get notifications you care about. We may notify you about updates to your account.
                            </Typography>
                        </Grid>
                        <Grid item xs={2}/>

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
                                <Grid item xs={12} ml={2} sx={{display: "flex", alignItems: "center"}} p={2}>
                                    <Typography color="black" fontWeight="bold" mb={3} variant="body1">
                                        Message
                                    </Typography>

                                    <Grid item xs={1} mx={2} mb={3}>
                                        <Switch {...label} value={receiveEmail}/>
                                    </Grid>
                                    <Grid item xs={12} sx={{display: "flex", alignItems: "center"}}>
                                        <Typography color="secondary" fontWeight="bold" mb={3} variant="body1">
                                            When turned off, you won't get any more news from us.
                                        </Typography>
                                    </Grid>

                                </Grid>
                                <Grid item xs={2} ml={1} mb={3}>
                                    <Button
                                        color="primary"
                                        size="large"
                                        // type="submit"
                                        variant="contained"
                                    >
                                        Save change
                                    </Button>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </TabPanel>
            </Box>
        </ThemeProvider>
    );
}
