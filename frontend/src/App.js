import "./App.css";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:5000");

  return <div className="App"></div>;
}

export default App;
