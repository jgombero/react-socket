import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function App() {
  const [state, setState] = useState({ msg: "", chat: [], nickname: "" });

  useEffect(() => {
    socket.on("chat message", ({ nickname, msg }) => {
      setState({
        chat: [...state.chat, { nickname, msg }],
        nickname,
        msg: "",
      });
    });
  }, [state]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = () => {
    const { nickname, msg } = state;
    socket.emit("chat message", { nickname, msg });
    setState({ ...state, msg: "" });
  };

  const renderChat = () => {
    const { chat } = state;
    return chat.map(({ nickname, msg }, idx) => {
      return (
        <div key={idx}>
          <span style={{ color: "green" }}>{nickname}: </span>

          <span>{msg}</span>
        </div>
      );
    });
  };

  return (
    <div>
      <span>Nickname</span>
      <input
        name="nickname"
        onChange={(e) => onTextChange(e)}
        value={state.nickname}
      />
      <span>Message</span>
      <input name="msg" onChange={(e) => onTextChange(e)} value={state.msg} />
      <button onClick={onMessageSubmit}>Send</button>
      <div>{renderChat()}</div>
    </div>
  );
}

export default App;
