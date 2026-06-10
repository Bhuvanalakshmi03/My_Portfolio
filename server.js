const express = require('express');
const app = express();
const PORT = 3030;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Serve static files from the public folder
app.use(express.static("public"));

const projects = require("./data/project.js");
// Route for home page
app.get("/", (req, res) => {
    res.render("pages/index", { projects});
})

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, " +
                    "and App is listening on port "+ PORT);
    else 
        console.log("Error occurred, server can't start", error);
    }
);
