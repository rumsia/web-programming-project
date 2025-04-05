import PostModel from "../models/post.js";

export const newPost = async (req, res, next) => {
  try {
    const { name, breed, age, gender, user } = req.body;
    const image = req.file.filename;

    if (!image) {
      return res.status(400).json({ error: "La imagen es obligatoria" });
    }

    const newPost = new PostModel({
      name,
      breed,
      age,
      gender,
      image,
      user,
    });
    await newPost.save();

    res
      .status(201)
      .json({ message: "Publicación creada con éxito", post: newPost });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await PostModel.find().populate(
      "user",
      "name lastname email"
    );
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
