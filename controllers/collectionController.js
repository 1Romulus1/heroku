import mongoose from "mongoose";
import Collection from "../model/Collection.js";
import User from "../model/User.js";

export const getAllCollections = async (req, res, next) => {
  let collections;
  try {
    collections = await Collection.find();
  } catch (error) {
    console.log(error);
  }
  if (!collections) {
    return res.status(404).json({ message: "No collections found" });
  }
  return res.status(200).json({ collections });
};

export const addCollection = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if(!existingUser){
    return res.status(400).json({message: "Unable to find User by this ID"})
  }
  const collection = new Collection({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await collection.save({session});
    existingUser.collections.push(collection);
    await existingUser.save({session})
    await session.commitTransaction()
  } catch (error) {
    console.log(error);
    return res.status(500).json({collection})
  }
  return res.status(200).json({ collection });
};

export const updateCollection = async (req, res, next) => {
  const { title, description } = req.body;
  const collectionId = req.params.id;
  let collection;
  try {
    collection = await Collection.findByIdAndUpdate(collectionId, {
      title,
      description,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!collection) {
    return res.status(500).json({ message: "Unable to update the blog" });
  }
  return res.status(200).json({ collection });
};
