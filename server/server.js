import dotenv from "dotenv"

import express from "express"
import connectionDb from "./config/connection.js";
import morgan from "morgan"
import productRoute from "./routes/products.js"
import userRoute from "./routes/users.js"
import user from "./models/user.js";
import cookie from "./utils/cookie.js";
import cookieParser from "cookie-parser"
import profileRoute from "./routes/profile.js"




//initialising express  

const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config({ path: "server/config/config.env" });

///database connection
connectionDb();
app.use(morgan('dev'))

app.use(express.json());
app.use(cookieParser());


  //routing for products
  app.use("/api",productRoute)

  app.use("/api",userRoute)

  app.use("/api",profileRoute)


  //express Listening

app.listen(PORT,()=>{
    console.log(`🌍 Now listening on PORT:${PORT}`);
})

