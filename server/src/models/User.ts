import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: ["super-admin", "admin", "expert", "operator"] },
});
type User = InferSchemaType<typeof userSchema>;
export default model <User> ("User", userSchema);
