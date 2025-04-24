const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let messages = [];
let users = [{ username: 'user1', password: 'pass' }];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) return res.json({ success: true });
  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.get('/messages', (req, res) => {
  res.json(messages);
});

app.post('/messages', (req, res) => {
  const { text, sender } = req.body;
  const timestamp = new Date().toISOString();
  const message = { text, sender, timestamp };
  messages.push(message);
  res.json(message);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
