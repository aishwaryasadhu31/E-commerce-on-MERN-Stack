import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();


const connectionDb = () => {
mongoose.connect(process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then((con) => {
    console.log(`Connected to MongoDB ${con.connection.host}`);
    // Further code logic here
  })
    .catch(err => {
        console.log(`The error is ${err}`)
    });
}


export default connectionDb;
