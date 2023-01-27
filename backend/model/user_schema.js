import mongoose from "mongoose";

const empSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobile: String
}, {
    timestamps: true
});

const employeeData = mongoose.model("employee", empSchema);

export default employeeData;