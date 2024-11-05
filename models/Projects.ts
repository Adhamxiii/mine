import { Schema, models, model } from "mongoose";

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
    type: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
    },
    small_overview: {
      type: String,
      required: true,
    },
    isPined: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

export default models.Project || model("Project", ProjectSchema);
