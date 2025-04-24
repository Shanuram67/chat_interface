import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login', {
        username: username,
        password: 'pass', // dummy password
      });
      if (res.data.success) setIsLoggedIn(true);
    } catch {
      alert('Login failed');
    }
  };

  const sendMessage = async () => {
    await axios.post('http://localhost:5000/messages', {
      text: input,
      sender: username,
    });
    setInput('');
    fetchMessages();
  };

  const fetchMessages = async () => {
    const res = await axios.get('http://localhost:5000/messages');
    setMessages(res.data);
  };

  useEffect(() => {
    if (isLoggedIn) fetchMessages();
  }, [isLoggedIn]);

  return (
    <div className="chat-container">
      {!isLoggedIn ? (
        <div className="login">
          <h2>Login</h2>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
          <button onClick={login}>Login</button>
        </div>
      ) : (
        <>
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className="message">
                <strong>{msg.sender}</strong>: {msg.text}
                <div className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</div>
              </div>
            ))}
          </div>
          <div className="input-box">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
