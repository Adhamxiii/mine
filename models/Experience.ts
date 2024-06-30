import { model, models, Schema } from "mongoose";

const ExperienceSchema = new Schema(
    {
        position: String,
        company: String,
        duration: String,
        location: String,
        jobprofile: String,
    },
    { timestamps: true }
);

const Experience = models.Experience || model("Experience", ExperienceSchema);

export default Experience;