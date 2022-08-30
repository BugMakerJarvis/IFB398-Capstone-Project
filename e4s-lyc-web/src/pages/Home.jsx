import React from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function Home() {
  return (
    <section className="hero">
      {/* content for the hero */}
      <div className="hero__content">
        {/* <h1 className="hero__title">HOME PAGE</h1> */}
        <div className="hero__image">
          <img alt="element-background" src="img/homepage_heroImage.png"></img>
        </div>
      </div>
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
      <hr width="18%" style={{
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "150px",
        marginBottom: "150px",
        textAlign: "center",
        backgroundColor: "rgba(45,247,179,1)",
        height: "3px",
        border: "none",
      }} />
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
      <hr width="18%" style={{
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "100px",
        marginBottom: "100px",
        textAlign: "center",
        backgroundColor: "rgba(45,247,179,1)",
        height: "3px",
        border: "none",
      }} />

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
            variant="contained"
            color="error"
            size="large"
            style={{
              borderRadius: "15px",
              backgroundColor: "rgb(45,247,179)"
            }}
            onClick={()=>{
              window.open("https://buy.stripe.com/test_5kA0377ko0nobss7ss")
            }}>
            ADD TO CART
          </Button>
        </Grid>
      </Grid>
      <hr width="18%" style={{
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "100px",
        marginBottom: "100px",
        textAlign: "center",
        backgroundColor: "rgba(45,247,179,1)",
        height: "3px",
        border: "none",
      }} />
    </section>
  );
}
