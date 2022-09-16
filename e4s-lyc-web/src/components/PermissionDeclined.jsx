import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

export default function PermissionDeclined(props) {

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    width: 1000,
                    height: 700,
                    ml: "auto",
                    mr: "auto",
                    mt: "100px",
                    mb: "100px",
                    textAlign: "center",
                    border: "none",
                }}

            >
                <Typography sx={{mt:40}} fontFamily="Comic Sans MS" variant="h5" align="center" fontSize={40} color="primary">
                    {props.msg}
                </Typography>
            </Box>
        </ThemeProvider>
    )
}