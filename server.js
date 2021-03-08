const app = require ('./app')
const mongoose = require('mongoose');

const PORT = 3000;


const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose
  .connect("mongodb://localhost:27017/madamSaucedatabase", { ...options })
  .then(() => console.log("connected to MongoDB..."))
  .catch((err) => console.error("could not connect to MongoDB..."));

app.listen(PORT, () => {
  console.log(`app running on  port ${PORT}...`);
});




