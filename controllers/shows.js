const { Show, watched } = require("./../models");
const { validationResult } = require("express-validator");
const { db } = require("../db/connection");
const { QueryTypes } = require("sequelize");

module.exports = {
    allShows: async (req, res, next) => {
        try {
            let query = `select shows.*, v.rating 
                        from shows
                        left join (
                            select showid, avg(rating) rating from userShowRatings
                            group by showid
                        ) v on v.showid = shows.id`;
            const shows = await db.query(query, {
                type: QueryTypes.SELECT,
            });
            res.json(shows);
        } catch (error) {
            next(error);
        }
    },
    showById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const show = await Show.findByPk(id, { include: watched });
            res.json(show);
        } catch (error) {
            next(error);
        }
    },
    showsByGenre: async (req, res, next) => {
        try {
            const genre = req.params.genre.toLowerCase();
            const showsWithGenre = await Show.findAll({
                where: { genre: genre },
            });
            res.json(showsWithGenre);
            res.json(genre);
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
    updateShowStatus: async (req, res, next) => {
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

// To do: space and - for Science Fiction
