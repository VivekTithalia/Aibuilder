import express from "express";
import {
  generatewebsite,
  getWebsiteById,
} from "../controller/website.controller.js";
import isAuth from "../middleware/isAuth.js";

const websiteroute = express.Router();

websiteroute.post("/genwebsite", isAuth, generatewebsite);
websiteroute.get("/:id", isAuth, getWebsiteById);

export default websiteroute;
