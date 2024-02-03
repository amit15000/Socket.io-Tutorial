import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const socket = useMemo(() => io("http://localhost:5000"), []);

  const [inputValue, setInputValue] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    socket.emit("messageToRoom", inputValue);
    setInputValue("");
  };
  useEffect(() => {
    socket.on("connect", () => {
      console.log("You are now connected {msg From frontend}");
    });
    socket.on("welcome", (message) => {
      console.log(message);
    });
    socket.on("msgToAll", (message) => console.log(message));

    socket.on("message-recieved", (data) => {
      console.log("Message recieved :", data);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);
  return (
    <div className=" text-center mt-8">
      <form onSubmit={submitHandler}>
        <input
          className=" bg-black text-red-50 text-center"
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
