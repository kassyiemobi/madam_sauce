const dotenv = require('dotenv')
const app = require ('./app')
const mongoose = require('mongoose');

dotenv.config({path: './.env'});

const PORT = process.env.PORT //3000;
const DB =process.env.DATABASE

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose
  .connect(DB, { ...options })
  .then(() => console.log("connected to MongoDB..."))
  .catch((err) => console.error("could not connect to MongoDB..."));

app.listen(PORT, () => {
  console.log(`app running on  port ${PORT}...`);
});
app.set("view engine", "handlebars");



