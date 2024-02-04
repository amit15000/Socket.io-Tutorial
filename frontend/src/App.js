import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const socket = useMemo(() => io("http://localhost:5000"), []);

  //person to person
  const [inputValue, setInputValue] = useState("");
  const [mySocketId, setMySocketId] = useState("");
  const [onlyToSocket, setOnlyToSocket] = useState("");

  //join room
  const [roomName, setRoomName] = useState(null);
  const [rooms, setRooms] = useState([]);

  //Message to room
  const [messageToRoom, setMessageToRoom] = useState("");
  const [toSendToRoomName, setToSendToRoomName] = useState("");

  //message recieved
  const [received_messages, setreceived_messages] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    //message to all
    // socket.emit("messageToRoom", inputValue);

    //message to particular Socket ID
    socket.emit("oneToOne", { onlyToSocket, inputValue });

    setInputValue("");
  };
  const submitHandlerForRoom = (e) => {
    e.preventDefault();
    socket.emit("onlyToRoom", { toSendToRoomName, messageToRoom });
    setMessageToRoom("");
  };

  const joinHandler = (e) => {
    e.preventDefault();

    if (roomName) {
      setRoomName(roomName);
      setRooms((prevRooms) => [...prevRooms, roomName]);
      socket.emit("join-room", roomName);
      setRoomName("");
    }
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
    <div>
      <div className=" text-center mt-8">
        <div className="mb-4">
          Your Socket ID :{" "}
          <span className=" text-green-800 text-lg font-semibold border-2 border-dotted border-black py-1 px-2">
            {mySocketId}
          </span>
        </div>
        {rooms && (
          <>
            <div className="inline">You are present in Rooms : </div>
            <div className="border-2 inline-flex gap-x-5 font-bold">
              {rooms.map((room, index) => {
                return <span key={index}>{room}</span>;
              })}
            </div>
          </>
        )}

        <br></br>
        <br></br>

        <div className="text-xl font-semibold">Join Room</div>
        <form onSubmit={joinHandler}>
          <label>Enter Name of the Room : </label>
          <input
            value={roomName}
            className="border border-solid border-black mt-1 p-1"
            onChange={(e) => setRoomName(e.target.value)}
          ></input>
          <button type="submit" className="border-2">
            Join
          </button>
        </form>
        <br></br>
        <br></br>
      </div>
      <div className="flex justify-around">
        <div className="mt-10 flex flex-col text-center">
          <div className="font-bold text-lg mb-2">Message To Person</div>
          <form onSubmit={submitHandler}>
            <label>Send Message To : </label>
            <input
              placeholder="Sokcet ID of Receiver"
              className=" bg-slate-500 text-red-100 text-center"
              onChange={(e) => setOnlyToSocket(e.target.value)}
            ></input>
            <br />
            <br />

            <label>Write Message : </label>
            <input
              className=" bg-green-300 font-bold text-center"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            ></input>

            <button
              className=" bg-blue-300 rounded-sm mt-2 mb-3 ml-2 p-1"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
        <div className="flex flex-col text-center justify-center">
          <div className="font-bold text-lg mb-2">Message To Room</div>
          <form onSubmit={submitHandlerForRoom}>
            <label>Send Message To : </label>
            <input
              placeholder="Room Name"
              className=" bg-slate-500 text-red-100 text-center"
              onChange={(e) => setToSendToRoomName(e.target.value)}
            ></input>
            <br />
            <br />

            <label>Write Message : </label>
            <input
              className=" bg-green-300 font-bold text-center"
              onChange={(e) => setMessageToRoom(e.target.value)}
              value={messageToRoom}
            ></input>

            <button
              className=" bg-blue-300 rounded-sm mt-2 mb-3 ml-2 p-1"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-xl font-bold italic">
        Received Messages
      </div>
      <div className="flex flex-col text-lg min-h-screen bg-slate-300 text-red-900 p-2">
        {received_messages.map((message, index) => {
          return <h3 key={index}>{message}</h3>;
        })}
      </div>
    </div>
  );
}

export default App;
