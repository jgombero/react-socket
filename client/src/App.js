import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function App() {
  const [msg, setMsg] = useState({ msg: "", chat: [] });

  useEffect(() => {
    socket.on("chat message", ({ id, msg }) => {
      setMsg({ msg: "", chat: [...msg.chat, { id, msg: msg.msg }] });
    });
  }, []);

  const onTextChange = (e) => {
    setMsg({ ...msg, msg: e.target.value });
  };

  const onMessageSubmit = () => {
    socket.emit("chat message", msg);
    setMsg({ ...msg, msg: "" });
  };

  const renderChat = () => {
    const { chat } = msg;
    return chat.map(({ id, msg }, idx) => {
      return (
        <div key={idx}>
          <span style={{ color: "green" }}>{id}: </span>
          <span>{msg}</span>
        </div>
      );
    });
  };

  return (
    <div>
      <input onChange={(e) => onTextChange(e)} value={msg.msg} />
      <button onClick={onMessageSubmit}>Send</button>
      <div>{renderChat()}</div>
    </div>
  );
}

export default App;
