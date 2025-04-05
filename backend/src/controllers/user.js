import userModel from "../models/user.js";

export const updateUser = async (req, res) => {
  try {
    const { id, name, lastname, email, password } = req.body;

    if (!name || !lastname || !email) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const updateData = { name, lastname, email };

    if (password) {
      updateData.password = password;
    }
    const updatedUser = await userModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.status(200).json({
      message: "Usuario actualizado exitosamente",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
