const dotenv = require("dotenv");
const { application } = require("express");
const cors = require("cors");
const express = require("express");
const app = express();

dotenv.config({ path: './config.env' });

// require("./db/conn");

app.use(express.json()); // to convert incoming data in express to json
app.use(cors());

// app.use(require('./router/auth'))
// app.use(require('./router/organizer'))
// app.use(require('./router/event'))
// app.use(require('./router/customer'))

const port = '3010';

app.listen(port, () => {
  console.log("server is running at port 3010");
});




