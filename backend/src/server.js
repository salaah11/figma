const express = require('express');
const cors = require('cors');
require('dotenv').config();
const stagesRouter = require('./routes/stages');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Préfixe API
app.use('/api/stages', stagesRouter);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
