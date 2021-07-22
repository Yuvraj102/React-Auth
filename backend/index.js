const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cors());

const SECRECTKEY = "hsgd67";
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("works fine");
});
app.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (username === "yuvraj" && password === "123456") {
    const user = {
      username,
      age: 18,
    };
    jwt.sign({ user }, SECRECTKEY, (err, token) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({ token });
      }
    });
  } else {
    res.sendStatus(403);
  }
});
const verifyTheToken = (req, res, next) => {
  // token comes in http headers
  const bearer = req.headers["authorization"];
  if (bearer) {
    const bearerToken = bearer.split(" ");
    const token = bearerToken[1];
    console.log(token);
    jwt.verify(token, SECRECTKEY, (err, data) => {
      if (err) {
        res.send(`error 403 forbideen in verify ${err}`);
      } else {
        req.userData = data;
        next();
      }
    });
  } else {
    // i.e if bearer is undefined
    res.send("no bearer");
  }
};
app.post("/delete-user", verifyTheToken, (req, res) => {
  //
  console.log("printing userdata", req.userData);
  res.send("user deleted");
});

app.listen(PORT, () => {
  console.log("server started on port 5000");
});
/*token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoieXV2cmFqIiwiYWdlIjoxOH0sImlhdCI6MTYyNjg0NzQxNn0.Y4kYW6DcEif5cd1nC9nDMnR3tfnX3ws1CeGgfdewRfU
*/

// 19:13
