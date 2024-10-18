const UserModel= require("../models/allUsers") 

async function getUsersData(_, res) {
   try {
        const usersData = await UserModel.find();
        console.log(usersData);
        res.status(200).json(usersData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function signUpUser(req, res) {
    const body = req.body;
    if (body && body.firstName && body.lastName && body.age && body.email) {
        const data = await UserModel.create(body);
        if (!data) return res.status(500).json({ status: "error", message: "Unexpected Error" })
        return res.status(201).json({ status: "success", message: "User Created", user: data })
    } else {
        return res.status(400).json({ status: "error", message: "Bad Request" })
    }
}

async function deleteUser(req, res) {
    const { _id: id } = req.body;
    if (!id)
        return res.status(500).json({ status: "error", message: "Unexpected Error" })

    const response = await UserModel.findByIdAndDelete(id);
    if (!response) return res.status(400).json({ status: "error", message: "No user found" })

    return res.status(200).json({ status: "success", message: "User deleted successfully", response })
}

async function updateUser(req, res) {
    const body = req.body;

    const response = await UserModel.findByIdAndUpdate(body._id, body, { new: true });
    if (!response) return res.status(400).json({ status: "error", message: "Invalid Id" });
    return res.status(200).json({ status: "success", message: "User updated successfully", user: response });
}

module.exports = {
    getUsersData,
    signUpUser,
    deleteUser,
    updateUser
}