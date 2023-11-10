const { User, Show } = require("./../models");
module.exports = {
    allUsers: async (req, res, next) => {
        try {
            const users = await User.findAll({ include: Show });
            res.json(users);
        } catch (error) {
            next(error);
        }
    },
    userById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    },
    userShows: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id, { include: Show });
            res.json(user);
        } catch (error) {
            next(error);
        }
    },
    userUpdatedShows: async (req, res, next) => {
        try {
            const { id, showId } = req.params;
            const user = await User.findByPk(id, { include: Show });
            const show = await Show.findByPk(showId);
            const userRating = req.body.rating;
            await show.update(req.body);
            await user.addShows(show);
            const userWithShows = await User.findByPk(id, { include: Show });
            res.json(userWithShows);
        } catch (error) {
            next(error);
        }
    },
};
