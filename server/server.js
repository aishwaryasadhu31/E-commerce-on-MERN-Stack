import dotenv from "dotenv"

import express from "express"
import connectionDb from "./config/connection.js";
import morgan from "morgan"

const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config({ path: "server/config/config.env" });
connectionDb();
app.use(morgan('dev'))
app.get('/', (req, res) => {
    res.send('I Love You Babu')
  })

app.listen(PORT,()=>{
    console.log(`🌍 Now listening on PORT:${PORT}`);
})


