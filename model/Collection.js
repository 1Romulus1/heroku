import mongoose from "mongoose";

const Schema = mongoose.Schema

const collectionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

export default mongoose.model("Collection", collectionSchema)