const express = require("express");
const connectDb = require("./config/db");
const errorHandler = require("./utils/errorHandler");
const userRouter = require("./routes/userRoute");
const assignRouter = require("./routes/assignment");
const authenticateJWT = require("./midleware/authenticate");
const cookieParser = require('cookie-parser');
const seed = require("./utils/seed");
const app = express();
require("dotenv").config(); 

connectDb();


app.use(express.json());
app.use(cookieParser())

app.use('/api/users', userRouter); 
app.use('/api/assignment', assignRouter); 


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

app.get("/", authenticateJWT,(req, res) => {
  const user =req.user;
  console.log(req.user)
  res.status(200).json({ user:user, message: "The engine is set up now" });
});
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.use('/api/users', userRouter); 



const PORT = process.env.PORT || 8000;
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
