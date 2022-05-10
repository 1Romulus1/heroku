import express from "express";
import {
  addCollection,
  getAllCollections,
  updateCollection,
} from "../controllers/collectionController.js";

const collectionRouter = express.Router();

collectionRouter.get("/", getAllCollections);
collectionRouter.post("/add", addCollection);
collectionRouter.put("/update/:id", updateCollection);

export default collectionRouter;
