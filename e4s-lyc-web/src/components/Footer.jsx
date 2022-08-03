import React from "react";
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    color: "#fff",
                    ":hover": {
                    color: "#52BD66"
                    },
                },
            },
        },
    },
});

export default function Footer() {
    return (
        <footer>
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        width: "auto",
                        height: 160,
                        color: "white",
                        backgroundColor: "black",
                        p: 5,
                        mt: 10
                    }}
                >
                    <Link mx={1} href="https://www.facebook.com/elements4success/" target="_blank" >
                        <FacebookIcon />
                    </Link>
                    <Link mx={1} href="https://www.instagram.com/elements4success/" target="_blank" >
                        <InstagramIcon />
                    </Link>
                    <Link mx={1} href="https://au.linkedin.com/in/kylee-leota-65a332100" target="_blank" >
                        <LinkedInIcon />
                    </Link>

                    <Typography mt={3} component="h6" variant="h8">
                        Copyright © 2022 Elements 4 Success
                    </Typography>

                </Box>
            </ThemeProvider>
        </footer>
    );
}