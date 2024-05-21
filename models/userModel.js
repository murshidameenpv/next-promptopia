import mongoose ,{models} from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: [true, `Username is required`],
      match: [
        /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
      ],
    },
    email: {
      type: String,
      unique: [true, `Email already Exists`],
      required: [true, `Email is required!`],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);
const userDb = models.User || mongoose.model("User", userSchema);
export default userDb;



// In your code, models.User refers to the User model. If the User model has already been defined, models.User will be truthy, and models.User || mongoose.model("User", userSchema) will return the existing User model.

// If the User model has not been defined, models.User will be falsy, and mongoose.model("User", userSchema) will be called to define the User model.

// This line of code is useful when you want to ensure that the User model is only defined once. If you try to define a Mongoose model more than once using the same name, Mongoose will throw an error. This line of code prevents that error by returning the existing model if it’s already been defined.