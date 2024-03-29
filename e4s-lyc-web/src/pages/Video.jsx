import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {getVideoCardConfig} from "../config/video-config";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useState, useEffect} from 'react';
import "../index.css"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {getUserProfile} from '../services/auth';
import moment from "moment";
import {getStreamSignedToken, getStreamURLWithToken} from "../services/stream";
import RefreshIcon from '@mui/icons-material/Refresh';

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

    const [open, setOpen] = React.useState(false);

    const [token, setToken] = React.useState("");

    const [isLoading, setIsLoading] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    // const handleClose = (event, reason) => {
    //     // if (reason && reason === "backdropClick")
    //     //     return;
    //     // myCloseModal();
    //     setOpen(false);
    // }

    const [title, setTitle] = useState();
    const [msg, setMsg] = useState();

    const paymentStatus = searchParams.get("pay");

    useEffect(() => {
        setIsLoading(true);
        if (paymentStatus === 'success') {

        } else if (paymentStatus === 'fail') {
            setTitle("Payment failure");
            setMsg("Your payment has failed, please click the button below to return to the home page.");
            handleClickOpen();
        } else {
            if (!localStorage.getItem("currentUserEmail")) {
                setTitle("You are not logged in!");
                setMsg("Please sign in to your account before visiting this page.");
                handleClickOpen();
            } else {
                getUserProfile(localStorage.getItem("currentUserEmail")).then((res) => {
                    if (res.user.isPurchased !== true) {
                        setTitle("Warning!");
                        setMsg("Please visit this page after purchasing the service from the home page.");
                        handleClickOpen();
                    }
                })
            }
        }

        // get token
        getStreamSignedToken(day).then((data) => {
            setToken(data.result.token);
        }).then(() => setIsLoading(false));

        // getStreamURLWithToken("sd");
    }, [paymentStatus, day])

    const [daysFromPayment, setDaysFromPayment] = React.useState(1);

    useEffect(() => {
        getUserProfile(localStorage.getItem("currentUserEmail")).then((res) => {
            if (res.user.paymentDate) {
                const currentDate = moment().format('YYYY-MM-DD');
                const paymentDate = moment(res.user.paymentDate).format('YYYY-MM-DD');
                setDaysFromPayment(moment(currentDate).diff(paymentDate, 'day') + 1);
            }
        });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Dialog
                open={open}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle color='primary' id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {msg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        navigate('/');
                        // handleClose();
                    }}>
                        Bcak to home page
                    </Button>
                </DialogActions>
            </Dialog>
            <CssBaseline/>
            <Box
                sx={{
                    // bgcolor: 'background.paper',
                    pb: 6,
                    mt: 5,
                    display: 'flex',
                    justifyContent: "center",
                    verticalAlign: "middle"
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
                    {isLoading ?
                        <Typography fontSize="xx-large" color="primary" sx={{mt: 30}}><RefreshIcon color="primary" fontSize="large"/> Loading...</Typography> :
                        <CardMedia
                            width="960"
                            height="540"
                            component="iframe"
                            autoPlay
                            controls
                            allowFullScreen
                            // src={videoConfig[day - 1].videoLink}
                            src={`https://customer-8bro4htdkojvgl0i.cloudflarestream.com/${token}/iframe`}
                        />}
                </Card>
                <List
                    aria-label="main videolist folders"
                    sx={{
                        width: 'auto',
                        maxWidth: 360,
                        // position: 'relative',
                        overflow: 'auto',
                        maxHeight: 540,
                    }}
                >
                    {videoConfig.map((card, index) => (
                        index < daysFromPayment ?
                            <ListItem key={card.title}>
                                <ListItemButton
                                    sx={day == index + 1 ? {borderRadius: 5, border: 2, borderColor: '#52BD66'} : null}
                                    onClick={() => navigate(`/video?day=${index + 1}`)}
                                >
                                    <Avatar sx={{mr: 2}} alt="logo" src="img/logo.jpg"/>
                                    <ListItemText
                                        primary={card.title}
                                        secondary={card.info}
                                        primaryTypographyProps={{
                                            fontSize: 17,
                                            fontWeight: 'bold',
                                            color: "primary"
                                        }}/>
                                </ListItemButton>
                            </ListItem> : <ListItem key={card.title}>
                                <ListItemButton disabled>
                                    <Avatar sx={{mr: 2}} alt="logo" src="img/logo.jpg"/>
                                    <ListItemText
                                        primary={"coming soon~"}
                                        primaryTypographyProps={{
                                            fontSize: 17,
                                            fontWeight: 'bold',
                                            color: "primary"
                                        }}/>
                                </ListItemButton>
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
                        {videoConfig[day - 1].affirmations}
                    </Typography>
                </Container>
            </Box>
        </ThemeProvider>
    );
}
