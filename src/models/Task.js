import { Schema, model, models } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      require: [true, "El titulo es requerido"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      require: [true, "La descripción es requerida"],
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
export default models.Task || model("Task", taskSchema);
