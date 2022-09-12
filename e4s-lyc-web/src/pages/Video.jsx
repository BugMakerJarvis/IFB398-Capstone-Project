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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: "#9A9A9A",
          ":hover": {
            bgcolor: "#52BD66",
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

const cards = [
  { title: "Day1", info: "Your Challenge Inspiration" },
  { title: "Day2", info: "Connecting To Yourself" },
  { title: "Day3", info: "Notice Yourself" },
  { title: "Day4", info: "Energy Giving, Energy Draining" },
  { title: "Day5", info: "A Day In The Life" },
  { title: "Day6", info: "Finding Joy" },
  { title: "Day7", info: "Acknowledging Fear" },
  { title: "Day8", info: "Self Feedback" },
  { title: "Day9", info: "Feedback To Others" },
  { title: "Day10", info: "Notice yourself" },
  { title: "Day11", info: "Notice yourself" },
  { title: "Day12", info: "Notice yourself" },
  { title: "Day13", info: "Notice yourself" },
  { title: "Day14", info: "Notice yourself" },
  { title: "Day15", info: "Notice yourself" },
  { title: "Day16", info: "Notice yourself" },
  { title: "Day17", info: "Notice yourself" },
  { title: "Day18", info: "Notice yourself" },
  { title: "Day19", info: "Notice yourself" },
  { title: "Day20", info: "Notice yourself" },
  { title: "Day21", info: "Notice yourself" }
];

const affirmations = [
  {
    title: "Day1",
    info: "I am valued and worthy of giving myself the time and space I need to do 'the work'."
  }
];

export default function Video() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          // bgcolor: 'background.paper',
          pb: 6,
          mt: 2,
          display: 'flex',
          justifyContent: "center"
        }}
      >
        <Card
          sx={{
            width: 900,
            height: 500,
            ml: 20
          }}
        >
          <CardMedia
            width={900}
            height={500}
            component="iframe"
            autoPlay
            controls
            allowFullScreen
            src="https://customer-8bro4htdkojvgl0i.cloudflarestream.com/56597506cb40ca7b9d0a69d90e40a556/iframe?preload=true&loop=true&autoplay=true&poster=https%3A%2F%2Fcustomer-8bro4htdkojvgl0i.cloudflarestream.com%2F56597506cb40ca7b9d0a69d90e40a556%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
          />
        </Card>
        <List
          component="Paper"
          aria-label="main mailbox folders"
          sx={{
            mr: 20,
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 500,
          }}
        >
          {cards.map((card) => (
            <ListItem key={card.title}>
              <ListItemButton>
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
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          width: 360,
          height: 3,
          backgroundColor: "rgba(32,219,144)",
          ml: "auto",
          mr: "auto",
          mb: 5,
          textAlign: "center",
          border: "none",
        }}
      />

      {/* submit part*/}
      <Box
        sx={{
          width: "auto",
          minHeight: 300,
          backgroundColor: "rgba(255,255,255,0.2)"
        }} xs={10}
      >
        <Container >
          <Typography component="h1"
            variant="h5"
            align="left"
            color="primary"
            fontWeight="bold">
            What are you hoping to gain from this self-leadership challenge?
          </Typography>

          {/* submit box */}
          <Box
            height="auto"
            component="form"
            noValidate
            sx={{ mt: 3 }}
          // onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              id="outlined-multiline-flexible"
              label="Talk about anything you want"
              multiline
              rows={4}
            // value={bio}
            // onChange={handleBioChange}
            />
            <Button
              sx={{ mt: 2 }}
              color="primary"
              size="large"
              variant="contained"
              onClick={handleClickOpen}
            // onClick={async () => {
            //   try {
            //     const res = await updateUserProfile(currentUserEmail, { bio, pronoun });
            //     setSnackbarOpen(true);
            //   } catch (error) {
            //     setSnackbarMsg("An error occurred when updating user profile!")
            //     setSnackbarState("error");
            //     setSnackbarOpen(true);
            //   }
            // }}
            >
              Submit
            </Button>
            <Dialog
              open={open}
              align="center"
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              {/* <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
              </DialogTitle> */}
              <DialogContent>
                <DialogContentText fontWeight="bold" fontSize={20} color="secondary" id="alert-dialog-description">
                  {affirmations[0].info}
                </DialogContentText>
                <CheckCircleOutlineIcon sx={{ mt:1, fontSize: 50, justifyContent:"center" }} color='primary' />
                <DialogContentText fontWeight="bold" fontSize={15} color="primary" id="alert-dialog-description">
                  Submit successfully
                </DialogContentText>
              </DialogContent>
              {/* <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  Got it!
                </Button>
              </DialogActions> */}
            </Dialog>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}