import { generateToken } from "../utils/jwt.js";
import userModel from "../models/user.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = generateToken({ id: user._id, email: user.email });
    res.cookie("Authorization", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.json({
      message: "Inicio de sesión exitoso",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, lastname, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "El correo ya está en uso" });
    }

    const newUser = new userModel({ name, lastname, email, password });
    await newUser.save();

    const token = generateToken({ id: newUser._id, email: newUser.email });
    res.cookie("Authorization", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(201).json({
      message: "Registro exitoso",
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        lastname: newUser.lastname,
      },
    });
  } catch (error) {
    next(error);
  }
};
