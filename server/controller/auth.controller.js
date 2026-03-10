import { generateresponse } from "../config/open.router.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const Googleauth = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;
    if (!name || !email) {
      return res
        .status(400)
        .json({ message: "credintials are required", ok: false });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, avatar });
    }
    //generate token
    const token = await jwt.sign({ id: user._id }, process.env.jwt_sec, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      //in devlopment strict and in production none in sameSite
      //secure false in development in production true
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log("error in googleauth", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    return res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    console.log("error in logout", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    console.log("error in getCurrentUser", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const generatedemo = async (req, res) => {
  try {
    const result = await generateresponse("hello");
    return res.status(200).json(result);
  } catch (error) {
    console.error("generatedemo error:", error.message, error.body || "");
    const status = error.status || 500;
    const message =
      error.message || "Failed to generate response from AI service";
    return res.status(status).json({
      ok: false,
      message: status === 500 ? "Internal server error" : message,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
