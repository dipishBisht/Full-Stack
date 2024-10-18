const mongoose=require("mongoose")

function connect(link) {
    return mongoose.connect(link).then(() => console.log("Connected to Mongo")).catch((err) => console.log(err));
}

module.exports=connect;