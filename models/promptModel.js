import { models, Schema, model } from "mongoose";
const promptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is Required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
    },
  { timestamps: true }
});
const promptDb = models.Prompt || model("Prompt", promptSchema);
export default promptDb;
