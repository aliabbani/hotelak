import express from "express";
import Hotel from "../models/Hotel.js"; // import the Hotel model

const router = express.Router();

// res is the response object
// req is the request object
// res.json() is a method that sends a json response
// res.json() takes an object as an argument
// res.json() sends the object as a json response
// res.status() is a method that sends a status code
// res.status() takes a status code as an argument

//CREATE
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    // set is a mongodb method
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { $new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
});

//GET
router.get("/:id", async (req, res) => {
  try {
    const hotels = await Hotel.findById(req.params.id);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
});

export default router;
