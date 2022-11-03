import './theme.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { TextField, Button, Container, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';
import Box from '@mui/material/Box';

const socket = io.connect("http://localhost:3001");
socket.on('connect_error', (err) => {
  console.log("Error to connect to server");
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const modalstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [userID, setuserID] = useState("");
  const [userPass, setuserPass] = useState("");
  const [userfname, setuserfname] = useState("");
  const [interfaceState, setInterfaceState] = useState("LOGIN");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const joinRoom = () => {
    // if (userID !== "" && room !== "") {
    //   socket.emit("join_room", room);
    // } else {
    //   handleOpen();
    // }
  }

  async function register() {
    const params = {
      userid: userID,
      userpass: userPass,
      name: userfname
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(params),
    };
    await fetch('https://amirulasri.com/project/kuptmchatserver/register', options)
      .then(response => response.text())
      .then(response => {
        console.log(response);
      });
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Container maxWidth='xl'><br /><br /><br />
          {interfaceState === "LOGIN" ?
            <form className='loginform'>
              <Typography variant="h5" gutterBottom color='white'>
                KUPTM Chat Login
              </Typography><br />
              <TextField variant='outlined' label='User ID' onChange={(text) => { setuserID(text.target.value) }} /><br />
              <TextField variant='outlined' type='password' label='Password' onChange={(text) => { setuserPass(text.target.value) }} /><br /><br />
              <Button variant='contained' color='primary' onClick={joinRoom}>Login</Button><br />
              <Button variant="text" color='primary' onClick={() => { setInterfaceState('REGISTER') }}>Create Account</Button>
            </form> :
            <form className='loginform'>
              <Typography variant="h5" gutterBottom color='white'>
                KUPTM Chat Register
              </Typography><br />
              <TextField variant='outlined' label='User ID' onChange={(text) => { setuserID(text.target.value) }} /><br />
              <TextField variant='outlined' type='password' label='Password' onChange={(text) => { setuserPass(text.target.value) }} /><br />
              <TextField variant='outlined' label='Name' onChange={(text) => { setuserfname(text.target.value) }} /><br /><br />
              <Button variant='contained' color='primary' onClick={() => { register() }}>Register</Button><br />
              <Button variant="text" color='primary' onClick={() => { setInterfaceState('LOGIN') }}>Already have account? Login</Button>
            </form>
          }
          {/* <Chat socket={socket} userID={studentID} room={room} /> */}
        </Container>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalstyle}>
            <Typography color='white' id="modal-modal-title" variant="h6" component="h2">
              Field required
            </Typography>
            <Typography color='white' id="modal-modal-description" sx={{ mt: 2 }}>
              Enter all required field to login
            </Typography>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
}

export default App;
