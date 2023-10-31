const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
const port = 3000;

app.get('/todos', async (req, res) => {
  res.send({
      id: 1,
      title: "Berenang"
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
