const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT | 3011;
const cors = require("cors");
const db = require("./models");
const cookieParser = require("cookie-parser");
const http = require("http");
const server = http.createServer(app);
const io = require("./utils/socket").initialize(server);

// ...
app.use(express.json());
app.use(
  cors({
    origin: [`*`, `http://localhost:3005`],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());
// Routers
const usersApi = require("./routes/Users");
const jobsApi = require("./routes/Jobs");
const agentsApi = require("./routes/Agents");

app.use("/users", usersApi);
app.use("/jobs",jobsApi);
app.use("/agents", agentsApi);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("Server listening on " + port);
  });
});
