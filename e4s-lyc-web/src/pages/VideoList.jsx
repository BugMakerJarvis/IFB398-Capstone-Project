import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {CardActionArea} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import DownloadIcon from '@mui/icons-material/Download';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {getVideoCardConfig} from "../config/video-config";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {'Copyright © '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

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


export default function VideoList() {
    const pdfDownload = () => {
        const link = document.createElement("a");
        link.download = `Lead Yourself Challenge.pdf`;
        link.href = "/Lead Yourself Challenge.pdf";
        link.click();
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {/* Hero unit */}
            <Box
                sx={{
                    // bgcolor: 'background.paper',
                    pb: 6,
                    mt: 10
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="primary"
                        gutterBottom
                    >
                        Welcome!
                    </Typography>
                    <Typography variant="h5" align="center" color="secondary" paragraph>
                        In order to lead throughout our lives we must first learn to lead ourselves.
                        In order to lead ourselves we must first know ourselves.
                    </Typography>
                    <Stack
                        sx={{pt: 4}}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                        <Button
                            variant="contained"
                            size='large'
                            onClick={() => {
                                window.open("https://customer-8bro4htdkojvgl0i.cloudflarestream.com/56597506cb40ca7b9d0a69d90e40a556/watch")
                            }}
                        >
                            Watch Intro Video</Button>
                        <Button
                            variant="outlined"
                            onClick={pdfDownload}>
                            <DownloadIcon sx={{mr: 1}}/>
                            Download pdf decument
                        </Button>
                    </Stack>
                </Container>
            </Box>
            <Container sx={{py: 4}} maxWidth="md">
                <Grid container spacing={4}>
                    {getVideoCardConfig().map((card) => (
                        <Grid item xs={12} sm={6} md={4}>
                            <CardActionArea href="/video">
                                <Card
                                    sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
                                >
                                    <CardMedia
                                        component="img"
                                        image="img/random.png"
                                        alt="random"
                                    />
                                    <CardContent sx={{flexGrow: 1}}>
                                        <Typography gutterBottom color="primary" variant="h5" component="h2">
                                            {card.title}
                                        </Typography>
                                        <Typography color="secondary">
                                            {card.info}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}
