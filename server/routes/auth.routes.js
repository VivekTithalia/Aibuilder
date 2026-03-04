import express from "express";
import {
  Googleauth,
  logout,
  getCurrentUser,
} from "../controller/auth.controller.js";
import isAuth from "../middleware/isAuth.js";

const authroutes = express.Router();

authroutes.post("/google", Googleauth);
authroutes.get("/logout", logout);
authroutes.get("/me", isAuth, getCurrentUser);

export default authroutes;
