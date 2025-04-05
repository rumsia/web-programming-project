import mongoose from "mongoose";

export const connect = async (uri) => {
  return mongoose.connect(uri);
};
