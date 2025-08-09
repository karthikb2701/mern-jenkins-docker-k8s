const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection (replace with your own Mongo URI later)
mongoose
  .connect(
    "mongodb+srv://karthikb2701:Karthikb2701@cluster0.gcwvkms.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Sample route
app.get("/", (req, res) => {
  res.send("Hello from Backend API");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
