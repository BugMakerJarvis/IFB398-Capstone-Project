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
import {Divider, IconButton, ListItemIcon, Menu, MenuItem} from "@mui/material";
import {signOutUser} from "../services/auth";

export default function Header(props) {

    const {currentUserName, onChange} = props;

    const signInRightContent = (
        <Grid item xs={4} mt={6} color="#000000">
            <Link fontSize={18} underline="none" href="/signin" color="inherit">
                Sign In
            </Link>
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
        <Grid item xs={4} mt={6} color="#000000">
            <Button
                onClick={handleClick}
                size="small"
                sx={{ml: 2}}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                {currentUserName}
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
                <MenuItem>
                    <Avatar/> Profile
                </MenuItem>
                <MenuItem>
                    <Avatar/> My account
                </MenuItem>
                <Divider/>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small"/>
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={() => signOutUser().then(() => {
                    localStorage.clear();
                    onChange(null);
                })}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Grid>
    );

    return (
        <header>
            <Box
                sx={{
                    width: "auto",
                    height: 150,
                    mx: 10,
                    mb: 2,
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
                        <Button href="https://elements4success.com.au/21-day-lead-yourself-challenge/">
                            <Avatar
                                src="img/logo.jpg"
                                alt="Icon" title="21 Day Lead Yourself Challenge"
                                sx={{width: 120, height: 120}}/>
                        </Button>
                    </Grid>
                    <Grid item xs={4} mt={6} color="#000000">
                        <Typography fontSize={18}>
                            Welcome to 21 Day Lead Yourself Challenge!
                        </Typography>
                    </Grid>
                    {currentUserName ? nameRightContent : signInRightContent}
                </Grid>
            </Box>
        </header>
    );
}
