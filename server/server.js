const express = require("express");
const connectDb = require("./config/db");
const errorHandler = require("./utils/errorHandler");
const userRouter = require("./routes/userRoute");
const app = express();
require("dotenv").config(); 

connectDb();

app.use(express.json());

app.use('/api/users', userRouter); 
app.get("/", (req, res) => {
  res.status(200).json({ message: "The engine is set up now" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
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
