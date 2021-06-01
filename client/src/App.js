import React, { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function App() {
  const [msg, setMsg] = useState({ msg: "" });

  const onTextChange = (e) => {
    setMsg({ msg: e.target.value });
  };

  const onMessageSubmit = () => {
    socket.emit("chat message", msg);
    setMsg({ msg: "" });
  };

  return (
    <div>
      <input onChange={(e) => onTextChange(e)} value={msg.msg} />
      <button onClick={onMessageSubmit}>Send</button>
    </div>
  );
}

export default App;
