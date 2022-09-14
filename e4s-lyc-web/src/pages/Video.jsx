import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getVideoCardConfig } from "../config/video-config";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../index.css"

const theme = createTheme({
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


const videoConfig = getVideoCardConfig();

export default function Video() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const day = searchParams.get("day");

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    // bgcolor: 'background.paper',
                    pb: 6,
                    mt: 5,
                    display: 'flex',
                    justifyContent: "center"
                }}
            >
                <Card
                    sx={{
                        width: 960,
                        height: 540,
                        borderRadius: 5, 
                        borderColor: '#52BD66'
                    }}
                >
                    <CardMedia
                        width="960"
                        height="540"
                        component="iframe"
                        autoPlay
                        controls
                        allowFullScreen
                        src={videoConfig[day].videoLink}
                    />
                </Card>
                <List
                    component="Paper"
                    aria-label="main videolist folders"
                    sx={{
                        width: 'auto',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                        // position: 'relative',
                        overflow: 'auto',
                        maxHeight: 540,
                    }}
                >
                    {videoConfig.map((card, index) => (
                        <ListItem key={card.title}>
                            {
                                (day == index)
                                    ?
                                    <ListItemButton
                                        sx={{ borderRadius: 5, border: 2, borderColor: '#52BD66' }}
                                        onClick={() => navigate(`/video?day=${index}`)}
                                    >
                                        <Avatar sx={{ mr: 2 }} alt="logo" src="img/logo.jpg" />
                                        <ListItemText
                                            primary={card.title}
                                            secondary={card.info}
                                            primaryTypographyProps={{
                                                fontSize: 17,
                                                fontWeight: 'bold',
                                                color: "primary"
                                            }} />
                                    </ListItemButton>
                                    :
                                    <ListItemButton
                                        onClick={() => navigate(`/video?day=${index}`)}
                                    >
                                        <Avatar sx={{ mr: 2 }} alt="logo" src="img/logo.jpg" />
                                        <ListItemText
                                            primary={card.title}
                                            secondary={card.info}
                                            primaryTypographyProps={{
                                                fontSize: 17,
                                                fontWeight: 'bold',
                                                color: "primary"
                                            }} />
                                    </ListItemButton>
                            }
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* line */}
            <Box
                sx={{
                    width: 360,
                    height: 3,
                    backgroundColor: "rgba(32,219,144)",
                    ml: "auto",
                    mr: "auto",
                    mb: 5,
                    mt: 5,
                    textAlign: "center",
                    border: "none",
                }}
            />

            {/* submit part*/}
            <Box
                sx={{
                    width: "auto",
                    minHeight: 100,
                    backgroundColor: "rgba(255,255,255,0.2)"
                }} xs={10}
            >
                <Container>
                    <Typography
                        fontFamily="Comic Sans MS"
                        fontWeight="bold"
                        fontSize={25}
                        color="primary"
                    >
                        {videoConfig[day].affirmations}
                    </Typography>
                </Container>
            </Box>
        </ThemeProvider >
    );
}
