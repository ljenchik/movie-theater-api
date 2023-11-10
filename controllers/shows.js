const { Show } = require("./../models");
const { validationResult } = require("express-validator");
module.exports = {
    allShows: async (req, res, next) => {
        try {
            const shows = await Show.findAll();
            res.json(shows);
        } catch (error) {
            next(error);
        }
    },
    showById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const show = await Show.findByPk(id);
            res.json(show);
        } catch (error) {
            next(error);
        }
    },
    showsByGenre: async (req, res) => {
        try {
            const { genre } = req.params;
            const showsWithGenre = await Show.findAll({
                where: { genre: genre },
            });
            res.json(showsWithGenre);
        } catch (error) {
            next(error);
        }
    },
    updateShowRating: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ error: errors.array() });
        } else {
            try {
                const { id } = req.params;
                const show = await Show.findByPk(id);
                await show.update(req.body);
                const shows = await Show.findAll();
                res.json(shows);
            } catch (error) {
                next(error);
            }
        }
    },
    updateShowAvailable: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ error: errors.array() });
        } else {
            try {
                const { id } = req.params;
                const show = await Show.findByPk(id);
                await show.update(req.body);
                const shows = await Show.findAll();
                res.json(shows);
            } catch (error) {
                next(error);
            }
        }
    },
    deleteShowById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const show = await Show.findByPk(id);
            await show.destroy();
            const shows = await Show.findAll();
            res.json(shows);
        } catch (error) {
            next(error);
        }
    },
};

// TO do: Insensitive search
