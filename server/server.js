import dotenv from "dotenv"

import express from "express"
import connectionDb from "./config/connection.js";
import morgan from "morgan"
import productRoute from "./routes/products.js"





//initialising express  

const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config({ path: "server/config/config.env" });

///database connection
connectionDb();
app.use(morgan('dev'))

app.use(express.json());


  //routing for products
  app.use("/api",productRoute)

  


  //express Listening

app.listen(PORT,()=>{
    console.log(`🌍 Now listening on PORT:${PORT}`);
})

