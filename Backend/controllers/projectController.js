import ProjectModel from "../models/projectModel.js";
// import UserModel from "../models/userModel.js";

export const createProjectController = async (req, res) => {
    try {
        const { title, description } = req.body;
        const { _id } = req.user;
        console.log(req.user);
        const project = await new ProjectModel({ title, description, ownerId: _id }).save();
        res.status(200).send({
            success: true,
            message: "Project created successfully",
            project,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating project",
            error,
        });
    }
};