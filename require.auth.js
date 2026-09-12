const jwt = require("jsonwebtoken");
const UserModel = require("./model/user.model.js");

const requireAuth = async (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Access denied - no token",
        });
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await UserModel.findById(payload.userId);

        if (!user) {
            return res.status(401).json({
                error: "User not found",
            });
        }

        req.user = payload;

        next();
    } catch (error) {
        return res.status(401).json({
            error: "Invalid or expired token",
        });
    }
};

const requireOwnership = (model) => async (req, res, next) => {
    try {
        const item = await model.findById(req.params.id);

        if (!item) {
            return res.status(404).json({
                error: "Not found",
            });
        }

        if (item.userId.toString() !== req.user.userId.toString()) {
            return res.status(403).json({
                error: "Forbidden",
            });
        }

        req.item = item;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    requireAuth,
    requireOwnership,
};