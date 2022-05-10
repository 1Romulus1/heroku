import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import path from 'path'
import userRouter from "./routes/userRoutes.js";
import collectionRouter from "./routes/collectionRoutes.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user/", userRouter);
app.use("/api/collection/", collectionRouter);

if(process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, './frontend/build')))

  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
  })
}
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT))
  .then(() => console.log("Connected to Database localhost 5000..."))
  .catch((err) => console.log(err));

//qGgxjqHAfLcPomG8
//mongodb+srv://roman:<password>@cluster3.jy6eo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
