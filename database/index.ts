import mongoose from "mongoose";

export default async function connectToDB() {
try {
    await mongoose.connect(process.env.MONGODB_URL!)
} catch (e) {
    console.error(e);
}
}