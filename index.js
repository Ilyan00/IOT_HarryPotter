import express from "express";
import router from "./routes/start.js";
import cors from "cors";

import bodyParser from "body-parser";
import ip from "ip";

const app = express();

const port = 3000;
let lastHouseVisited = "";

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

app.get("/lastHouse", async (req, res) => {
  res.json({ message: lastHouseVisited });
});

app.post("/lastHouse", (req, res) => {
  lastHouseVisited = req.body.house;
  console.log(req.body);
  res.json({ message: lastHouseVisited });
});

app.listen(port, () => {
  console.log(
    `Example app listening on port ${port}, and with IP ${ip.address()}`
  );
});
