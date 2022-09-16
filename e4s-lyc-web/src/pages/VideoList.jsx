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
import MovieIcon from '@mui/icons-material/Movie';
import DownloadIcon from '@mui/icons-material/Download';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {getVideoCardConfig} from "../config/video-config";
import {useNavigate, useSearchParams} from "react-router-dom";
import {updatePaymentStutus, getUserProfile} from '../services/auth';
import {useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from 'react';
import moment from "moment";


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
    const [open, setOpen] = React.useState(false);

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

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const paymentStatus = searchParams.get("pay");

    useEffect(() => {
        if (paymentStatus === 'success') {
            const currentUserEmail = localStorage.getItem("currentUserEmail");
            updatePaymentStutus(currentUserEmail, {'isPurchased': true, 'paymentDate': moment().format('YYYY-MM-DD')});
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
    }, [paymentStatus]);

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
                        fontFamily="Comic Sans MS"
                        component="h1"
                        variant="h2"
                        align="center"
                        color="primary"
                        gutterBottom
                    >
                        Welcome!
                    </Typography>
                    <Typography fontFamily="Comic Sans MS" variant="h5" align="center" color="secondary" paragraph>
                        In order to lead throughout our lives we must first learn to lead ourselves.
                        In order to lead ourselves we must first know ourselves.
                    </Typography>
                    <Typography fontFamily="Comic Sans MS" variant="h5" align="center" color="secondary" paragraph>
                        -- Kylee leota

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
                                window.open("https://customer-8bro4htdkojvgl0i.cloudflarestream.com/efa2a840165570460ce2165a2c302a3a/iframe?preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-8bro4htdkojvgl0i.cloudflarestream.com%2Fefa2a840165570460ce2165a2c302a3a%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600")
                            }}
                        >
                            <MovieIcon sx={{mr: 1}}/>
                            Watch Intro Video</Button>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                window.open("https://firebasestorage.googleapis.com/v0/b/e4s-lyc-web-f1383.appspot.com/o/Lead%20Yourself%20Challenge.pdf?alt=media&token=78a084f5-2bf7-4486-9823-c81471e9c2a8")
                            }}>
                            <DownloadIcon sx={{mr: 1}}/>
                            Download pdf decument
                        </Button>
                    </Stack>
                </Container>
            </Box>
            <Container sx={{py: 4}} maxWidth="md">
                <Grid container spacing={4}>
                    {getVideoCardConfig().map((card, index) => (
                        index < daysFromPayment ?
                            <Grid key={card.title} item xs={12} sm={6} md={4}>
                                <CardActionArea
                                    onClick={() => navigate(`/video?day=${index + 1}`)}
                                >
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
                            </Grid> : <Grid key={card.title} item xs={12} sm={6} md={4}>
                                <CardActionArea disabled>
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
