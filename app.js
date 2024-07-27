const express = require("express");
const app = express();
const cors = require("cors");

require("./connection/connection");
const path = require("path");
const auth = require("./routes/auth");
const list = require("./routes/list");

app.use(express.json());
app.use(cors());

// Serve the API routes
app.use("/api/v1", auth);
app.use("/api/v2", list);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "frontend", "build")));

// The catchall handler: for any request that doesn't match one above, send back React's index.html file.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

// Start the server
app.listen(1000, () => {
    console.log("Server started on port 1000");
});
