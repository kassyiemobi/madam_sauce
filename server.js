const app = require ('./app')
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
console.log("server is running");


