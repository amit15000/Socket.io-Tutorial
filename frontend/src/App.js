import "./App.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:5000");

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("You are now connected {msg From frontend}");
    });
    socket.on("welcome", (message) => {
      console.log(message);
    });
    socket.on("msgToAll", (message) => console.log(message));

    socket.on("messageToRoom", `${inputValue}`);
  });
  return (
    <div className="App">
      <form>
        <input onChange={(e) => setInputValue(e.target.value)}></input>
      </form>
    </div>
  );
}

export default App;
