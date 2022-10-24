import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';

function Chat({ socket, studentID, room }) {
    const [messagetext, setMessageText] = useState("");
    const sendMessage = async () => {
        if (messagetext !== "") {
            const messageJsonData = {
                room: room,
                studentID: studentID,
                message: messagetext,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };

            await socket.emit("send_message", messageJsonData);
        }
    }
    useEffect(() => {
        const eventListener = (data) => {
            console.log(data);
        };
        socket.on("receive_message", eventListener);
        return () => socket.off("receive_message", eventListener);
    }, [socket]);
    return (
        <div>
            <TextField variant='outlined' label='Message' onChange={(text) => { setMessageText(text.target.value) }} />
            <Button variant='contained' color='success' onClick={sendMessage}>Send</Button>
        </div>
    )
}

export default Chat