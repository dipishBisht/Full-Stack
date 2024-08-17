const mongoose=require("mongoose")

function connect(link) {
    return mongoose.connect(link)
}

module.exports=connect;