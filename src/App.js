import "./App.css";
import { useEffect, useRef, useState } from "react";
import { FormControl, Input } from "@material-ui/core";
import Message from "./Message";
import {
  db,
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "./firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState("");
  const promptDisplayedRef = useRef(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "messages"),
      (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          message: doc.data(),
        }));
        newMessages.sort((a, b) => b.message.timestamp - a.message.timestamp);
        setMessages(newMessages);
      },
      { orderBy: "timestamp" }
    );

    return () => unsubscribe(); 
  }, []);

  useEffect(() => {
    if (!promptDisplayedRef.current) {
      setUserName(prompt("Please Enter Your Name.."));
      promptDisplayedRef.current = true;
    }
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, "messages"), {
        message: input,
        userName: userName,
        timestamp: serverTimestamp(),
      });

      setInput("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="App">
      <h1>Messanger</h1>
      <h2>Welcome {userName}!</h2>
      <form className="app_form">
        <FormControl className="app_formControl">
          <Input
            className="app_input"
            placeholder="Enter message..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="app_iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ message, id }) => (
          <Message key={id} userName={userName} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
