const { User, Show } = require("./../models");
module.exports = {
    allUsers: async (req, res, next) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            next(error);
        }
    },
    userWithId: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    },
    userWithShows: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id, { include: Show });
            res.json(user);
        } catch (error) {
            next(error);
        }
    },
    userWithUpdatedShows: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            const show = await Show.create(req.body);
            await user.addShows(show);
            const updatedUser = await User.findByPk(id, { include: Show });
            res.json(updatedUser);
        } catch (error) {
            next(error);
        }
    },
};
