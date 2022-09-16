import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@mui/material";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
// import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
// import Snackbar from "@mui/material";

// stripe
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserProfile } from "../services/auth";
const stripePromise = loadStripe('pk_test_51LWDmVBgowzUydLpDnmdTTL2w9cYZ3O3w7U8XlwEAoWCOTiD3JcfjbXYlap2UgGaB3dMDVLi8U8rdqp0Y4sza4gG00B0JdbUss');

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

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
      // main: '#52BD66',
      main: '#20DB90',
      contrastText: '#fff',
    },
    secondary: {
      main: '#9A9A9A',
    },
  },
});

const urlParams = new URL(window.location.href);
const urlOrigin = urlParams?.origin;

const handleClick = async (event) => {
  // When the customer clicks on the button, redirect them to Checkout.
  const stripe = await stripePromise;
  const { error } = await stripe.redirectToCheckout({
    lineItems: [{
      price: 'price_1LcLNHBgowzUydLpUxIuLXu3', // Replace with the ID of your price
      quantity: 1,
    }],
    mode: 'payment',
    successUrl: urlOrigin + '/videolist?pay=success',
    cancelUrl: urlOrigin + '/videolist?pay=fail',
  });
  // If `redirectToCheckout` fails due to a browser or network
  // error, display the localized error message to your customer
  // using `error.message`.
};


export default function Home() {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const currentUserEmail = localStorage.getItem("currentUserEmail");

  // useEffect(() => {
  //   if (currentUserEmail !== null) {
  //     getUserProfile(currentUserEmail).then((res) => {
  //       if (res.user.isPurchased === true) {
  //         handleClickOpen();
  //       }
  //     })
  //   }
  // }, [currentUserEmail]);

  return (
    <section className="hero">
      <ThemeProvider theme={theme}>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle color="primary" id="customized-dialog-title" onClose={handleClose}>
            You have already purchased this service
          </DialogTitle>
          <DialogContent
          // dividers
          >
            <Typography gutterBottom>
              You have already purchased this service, enjoy the video now! Click the button below to go to the video page, or close this dialog box.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { navigate('/videolist') }}>
              Video List Page
            </Button>
          </DialogActions>
        </Dialog>

        <Box
          component="img"
          sx={{
            height: 'auto',
            width: '100%',
          }}
          alt="element-background"
          src="img/homepage_heroImage.png"
        />
        <Grid
          container
          direction="column"
          justifyContent="space-around"
          spacing={3}
          alignItems="center"
        >
          <Grid item>
            <img src="img/calendar.png" alt="calendar" width={300} />
          </Grid>
          <Grid item>
            <Typography style={{ fontSize: "28px", fontWeight: "900" }}>COMING SOON</Typography>

          </Grid>
          <Grid item>
            <Typography color="secondary" style={{ fontSize: "20px", fontWeight: "100" }}>A 21 Day Challenge dedicated to developing your skills as a leader so that you can effectively lead others! This <br />
              challenge is dedicated to empowering yourself as a leader. For 21 days, work towards being able to effectively lead <br />
              yourself so that you can successfully lead others! Dive into the world of self-care, self-awareness, vulnerability, and <br />
              transformation with Element 4 Success' Lead Yourself Challenge.</Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            width: 360,
            height: 3,
            backgroundColor: "rgba(32,219,144)",
            ml: "auto",
            mr: "auto",
            mt: "100px",
            mb: "100px",
            textAlign: "center",
            border: "none",
          }}
        />
        <Grid
          container
          direction="column"
          justifyContent="space-around"
          spacing={3}
          alignItems="center"
        >
          <Grid item>
            <Typography style={{ fontSize: "28px", fontWeight: "900" }}>Lead yourself so you can lead others</Typography>
          </Grid>
          <Grid item>
            <img src="img/three_icons.png" alt="lead yourself so you can lead others" width={1200} />
          </Grid>

          <Grid item>
            <Typography color="secondary" style={{ fontSize: "20px", fontWeight: "100" }}>A self-directed program aimed at helping you understand yourself and your 'WHY' so that you can develop your self-care <br />
              strategies and leadership skills! The 21 Day Lead Yourself Challenge has a proven track record for the development of your elements<br />
              for success, and is a high accountability program where you 'get out what you put in'.</Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            width: 360,
            height: 3,
            backgroundColor: "rgba(32,219,144)",
            ml: "auto",
            mr: "auto",
            mt: "100px",
            mb: "100px",
            textAlign: "center",
            border: "none",
          }}
        />

        <Grid
          container
          direction="column"
          justifyContent="space-around"
          spacing={3}
          alignItems="center"
        >
          <Grid item>
            <Typography sx={{ fontStyle: "italic", fontSize: "28px", fontWeight: "900" }}>To enquire about our services click the button below</Typography>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              size="large"
              type="submit"
              variant="contained"
              sx={{ mt: 4 }}
              onClick={() => {
                if (currentUserEmail === null) {
                  setSnackbarOpen(true);
                } else {
                  getUserProfile(currentUserEmail).then((res) => {
                    if (res.user.isPurchased === true) {
                      handleClickOpen();
                    } else {
                      handleClick();
                    }
                  })
                }
                // handleClick()
              }}>
              ADD TO CART
            </Button>
          </Grid>
        </Grid>


        <Box
          sx={{
            width: 360,
            height: 3,
            backgroundColor: "rgba(32,219,144)",
            ml: "auto",
            mr: "auto",
            mt: "100px",
            mb: "100px",
            textAlign: "center",
            border: "none",
          }}
        />
      </ThemeProvider>
      <Snackbar anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }} open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          Please sign in your account first
        </Alert>
      </Snackbar>
    </section>
  );
}
