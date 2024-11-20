import mongoose, { Schema, Document } from "mongoose";

// Schema -> interface/blueprint
interface IUser extends Document {
  name: string;
  location: string;
  role?: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  role: String,
});
// model -> bootstrapped schema
const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
