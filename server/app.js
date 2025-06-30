
const express = require("express");
const reactionRoute = require("./routes/reactionRoute");
require("dotenv").config();


const app = express();
const port = process.env.PORT || 5000;

// cors middleware for handling cross-origin requests
const cors = require("cors");
app.use(cors())

// db connection
const dbconnection = require("./db/dbconfig.js")

// auth middleware for protecting routes
const authMiddleware = require("./middleware/authMiddleware.js");

// json parser middleware for extracting data from request body

app.use(express.json()); 

// user routes middleware
const userRoute = require("./routes/userRoute.js");

app.use("/api/user", userRoute)


// question routes middleware

const questionRoute = require("./routes/questionRoute.js");

app.use(express.json());

app.use("/api/question", authMiddleware, questionRoute);





//  answer routes middleware
const answerRoute = require("./routes/answerRoute.js");
app.use(express.json()); 

app.use("/api/answer", authMiddleware, answerRoute);

// reaction route middleware
app.use("/api/answer", reactionRoute); 





app.get("/", (req, res) => {
  res.send("API is running...");
});
async function testDbConnection() {

    try {
        const result = await dbconnection.execute("select 'test' ");
         await app.listen(port);
        console.log("dabase connection successful");
        console.log(`listening on ${port}`)
    } catch (error) {
      console.log(error.message);
    }
    
}
testDbConnection();




