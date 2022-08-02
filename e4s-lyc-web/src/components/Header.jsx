import React from "react";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Header() {
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
                sx={{ width: 120, height: 120 }} />
            </Button>
          </Grid>
          <Grid item xs={4} mt={6} color="#000000">
            <Typography fontSize={18}>
              Welcome to 21 Day Lead Yourself Challenge!
            </Typography>
          </Grid>
          <Grid item xs={4} mt={6} color="#000000">
            <Link fontSize={18} underline="none" href="/signin" color="inherit">
              {'Sign in'}
            </Link>
          </Grid>
        </Grid>



      </Box>
    </header>
  );
}
