import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
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

export default function Home() {
  return (
    <section className="hero">
      <ThemeProvider theme={theme}>
        <Box
          component="img"
          sx={{
            height: 'auto',
            width: 'auto',
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
            <p style={{ fontSize: "28px", fontWeight: "900" }}>COMING SOON</p>

          </Grid>
          <Grid item>
            <p style={{ fontSize: "20px", fontWeight: "100" }}>A 21 Day Challenge dedicated to developing your skills as a leader so that you can effectively lead others! This <br />
              challenge is dedicated to empowering yourself as a leader. For 21 days, work towards being able to effectively lead <br />
              yourself so that you can successfully lead others! Dive into the world of self-care, self-awareness, vulnerability, and <br />
              transformation with Element 4 Success' Lead Yourself Challenge.</p>
          </Grid>
        </Grid>
        <Box
          sx={{
            width: 360,
            height: 3,
            backgroundColor: "rgba(82,189,102)",
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
            <p style={{ fontSize: "28px", fontWeight: "900" }}>Lead yourself so you can lead others</p>
          </Grid>
          <Grid item>
            <img src="img/three_icons.png" alt="lead yourself so you can lead others" width={1200} />
          </Grid>

          <Grid item>
            <p style={{ fontSize: "20px", fontWeight: "100" }}>A self-directed program aimed at helping you understand yourself and your 'WHY' so that you can develop your self-care <br />
              strategies and leadership skills! The 21 Day Lead Yourself Challenge has a proven track record for the development of your elements<br />
              for success, and is a high accountability program where you 'get out what you put in'.</p>
          </Grid>
        </Grid>
        <Box
          sx={{
            width: 360,
            height: 3,
            backgroundColor: "rgba(82,189,102)",
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
            <p style={{ fontSize: "28px", fontWeight: "900" }}><i>To enquire about our services click the button below</i></p>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              size="large"
              type="submit"
              variant="contained"
              sx={{ mt: 4 }}
              onClick={() => {
                window.open("https://buy.stripe.com/test_5kA0377ko0nobss7ss")
              }}>
              ADD TO CART
            </Button>
            </Grid>
            <Grid item>
            <Button
              color="primary"
              size="large"
              type="submit"
              variant="contained"
              sx={{ mt: 4 }}
              onClick={() => {
                window.open("https://buy.stripe.com/test_5kA0377ko0nobss7ss")
              }}>
              VIEW CONTENT
            </Button>
          </Grid>
        </Grid>
        <Box
          sx={{
            width: 360,
            height: 3,
            backgroundColor: "rgba(82,189,102)",
            ml: "auto",
            mr: "auto",
            mt: "100px",
            mb: "100px",
            textAlign: "center",
            border: "none",
          }}
        />
      </ThemeProvider>
    </section>
  );
}
