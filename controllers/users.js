const { User, Show, UserShowRating } = require("./../models");
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
            const user = await User.findByPk(id, { include: Show });
            res.json(user);
        } catch (error) {
            next(error);
        }
    },
    userShows: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id, { include: Show });
            res.json(await user.getShows());
        } catch (error) {
            next(error);
        }
    },
    userUpdatedShows: async (req, res, next) => {
        try {
            const { id, showId } = req.params;
            const userShowRating = await UserShowRating.findOne({
                where: { userId: id, showId: showId },
            });
            if (userShowRating === null) {
                UserShowRating.create({
                    userId: id,
                    showId: showId,
                    rating: req.body.rating,
                });
            } else {
                await userShowRating.update(req.body.rating);
                const user = await User.findByPk(id, { include: Show });
                res.json(user);
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
};
