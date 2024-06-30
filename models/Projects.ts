import  {Schema, models, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    small_overview: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Project || model("Project", ProjectSchema);
