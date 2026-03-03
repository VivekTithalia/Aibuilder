import express from "express";
import { Googleauth, logout } from "../controller/auth.controller.js";

const authroutes = express.Router();

authroutes.post("/google", Googleauth);
authroutes.get("/logout", logout);

export default authroutes;
