import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = model("User", UserSchema);

export const getUsers = () => UserModel.find();
export const geUserByEmail = (email: String) => UserModel.findOne({ email });
export const getUserById = (id: String) => UserModel.findById(id);
export const getUserBySessionToken = (sessionToken: String) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: String) =>
  UserModel.findByIdAndDelete({ _id: id });
export const upateUserById = (id: String, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
