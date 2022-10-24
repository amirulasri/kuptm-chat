import './theme.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { TextField, Button, Container, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';

const socket = io.connect("http://localhost:3001");
socket.on('connect_error', (err) => {
  console.log("Error to connect to server");
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [studentID, setStudentID] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (studentID !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Container maxWidth='xl'>
          <form className='loginform'>
            <Typography variant="h5" gutterBottom color='white'>
              KUPTM Chat Login
            </Typography><br />
            <TextField variant='outlined' label='Student ID' onChange={(text) => { setStudentID(text.target.value) }} /><br />
            <TextField variant='outlined' label='Room' onChange={(text) => { setRoom(text.target.value) }} /><br /><br />
            <Button variant='contained' color='primary' onClick={joinRoom}>Login</Button><br />
            <Button variant="text" color='primary'>Create Account</Button>
          </form>
          <Chat socket={socket} studentID={studentID} room={room} />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
