const express = require('express');
const app = express()


const PORT = 3000;


app.use(express.json());
app.listen(PORT, () => {
  console.log(`app running on  port ${PORT}...`);
});

module.exports = app;