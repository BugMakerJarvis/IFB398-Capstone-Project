import React, {useEffect, useState} from "react";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Divider, IconButton, ListItemIcon, Menu, MenuItem} from "@mui/material";
import {signOutUser} from "../services/auth";
import {useNavigate} from "react-router";

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontSize: 18,
                    color: "#000",
                    ":hover": {
                        color: "#52BD66"
                    },
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: "none",
                    color: "#000",
                    ":hover": {
                        textDecoration: "none",
                        color: "#000"
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

export default function Header(props) {

    // const {currentUserName, onChange} = props;

    const navigate = useNavigate();

    function pushToHome() {
        navigate('/')
    }

    const signInRightContent = (
        <Grid item xs={4} mt={6}>
            <Button
                size="large"
                href="/signin"
                color="primary"
                aria-haspopup="true"
            >
                Sign In
            </Button>
        </Grid>
    );

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const nameRightContent = (
        <Grid item xs={4} mt={6}>
            <Button
                onClick={handleClick}
                size="large"
                color="primary"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                Hello! {localStorage.getItem("currentUserName")}
            </Button>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'center', vertical: 'top'}}
                anchorOrigin={{horizontal: 'center', vertical: 'bottom'}}
            >
                <Divider/>
                <Link href="/settingspage">
                    <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small"/>
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                </Link>
                <MenuItem onClick={() => signOutUser().then(() => {
                    localStorage.clear();
                    pushToHome();
                })}>
                    <ListItemIcon>
                        <Link>
                            <Logout fontSize="small"/>
                        </Link>
                    </ListItemIcon>
                    Sign out
                </MenuItem>
            </Menu>
        </Grid>
    );

    return (
        <header>
            <ThemeProvider theme={theme}>
                <Box
                    component={Paper}
                    elevation={5}
                    sx={{
                        width: "auto",
                        height: 150,
                        mb: 4,
                        // mx: 20,
                        // backgroundColor: 'primary.dark',
                        // '&:hover': {
                        //   backgroundColor: 'primary.main',
                        //   opacity: [0.9, 0.8, 0.7],
                        // },
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Button href="/">
                                <Avatar
                                    src="img/logo.jpg"
                                    alt="Icon" title="21 Day Lead Yourself Challenge"
                                    sx={{width: 110, height: 110}}/>
                            </Button>
                        </Grid>
                        <Grid item xs={4} mt={7}>
                            <Typography color="primary" fontSize={18} component={'span'} variant={'body1'}>
                                Welcome to 21 Day Lead Yourself Challenge!
                            </Typography>
                        </Grid>
                        {localStorage.getItem("currentUserName") ? nameRightContent : signInRightContent}
                    </Grid>
                </Box>
            </ThemeProvider>
        </header>
    );
}
