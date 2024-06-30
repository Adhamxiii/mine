import { model, models, Schema } from "mongoose";

const SkillSchema = new Schema({
    skill: String,
    image: String
})

const Skills = models.Skills || model("Skills", SkillSchema);
export default Skills;
