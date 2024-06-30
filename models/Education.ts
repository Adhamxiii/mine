import { model, models, Schema } from "mongoose";

const EducationSchema = new Schema(
    {
        degree: String,
        year: String,
        college: String,
    },
    { timestamps: true }
);

const Education = models.Education || model("Education", EducationSchema);

export default Education;