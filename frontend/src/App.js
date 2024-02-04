import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const socket = useMemo(() => io("http://localhost:5000"), []);

  const [inputValue, setInputValue] = useState("");
  const [mySocketId, setMySocketId] = useState("");
  const [onlyToSocket, setOnlyToSocket] = useState("");
  const [received_messages, setreceived_messages] = useState([]);
  console.log(received_messages);
  const submitHandler = (e) => {
    e.preventDefault();

    //message to all
    // socket.emit("messageToRoom", inputValue);

    //message to particular Socket ID
    socket.emit("oneToOne", { onlyToSocket, inputValue });

    setInputValue("");
  };
  useEffect(() => {
    socket.on("connect", () => {
      console.log("You are now connected {msg From frontend}");
    });
    socket.on("welcome", (message) => {
      console.log(message);
      setMySocketId(socket.id);
    });
    socket.on("msgToAll", (message) => console.log(message));

    socket.on("message-recieved", (message) => {
      // console.log("Message recieved :", data);
      setreceived_messages((prev) => [...prev, message]);
      console.log(message);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);
  return (
    <div className=" text-center mt-8">
      <h2>
        Your Socket ID : <span className=" text-green-800">{mySocketId}</span>
      </h2>
      <form onSubmit={submitHandler}>
        <label>Send Message To :</label>
        <input
          placeholder="Sokcet ID of Receiver"
          className=" bg-slate-500 text-red-100 text-center"
          onChange={(e) => setOnlyToSocket(e.target.value)}
        ></input>

        <br />
        <label>Write Message :</label>
        <input
          className=" bg-black text-red-50 text-center"
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <br />
        <button className=" bg-blue-300 rounded-sm mt-2" type="submit">
          Submit
        </button>
      </form>
      <div className="flex flex-col text-lg w-200 h-300 bg-slate-300 text-red-900">
        {received_messages.map((message, index) => {
          return <h3 key={index}>{message}</h3>;
        })}
      </div>
    </div>
  );
}

export default App;
