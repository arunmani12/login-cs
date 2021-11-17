const express = require("express");
const app = express();
const dev = process.env.NODE_ENV !== "production";
app.use(express.json());
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/auth')
const db = require('./connectdb')
db()

app.use('/auth',authRoutes)


app.listen(PORT, err => {
    if (err) throw err;
    console.log("Express server running");
  });