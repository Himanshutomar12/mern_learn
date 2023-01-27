import mongoose from "mongoose";

const Connection = () => {
    const URL = process.env.ATLAS_URI;
    mongoose.set('strictQuery', true);
    mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(
        console.log("Connected to mongo db")
    ).catch(err => {
        console.log("Error while connecting to mongo db ", err);
    });
}

export default Connection;
