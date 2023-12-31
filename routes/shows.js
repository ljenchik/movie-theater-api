const showsRouter = require("express").Router();
const showsController = require("./../controllers/shows");
const {
    updateRatingValidation,
    updateAvailabilityValidation,
} = require("./../middleware/shows");

showsRouter.get("/", showsController.allShows);
showsRouter.get("/:id", showsController.showById);
showsRouter.get("/genre/:genre", showsController.showsByGenre);
showsRouter.put(
    "/:id/watched",
    updateRatingValidation,
    showsController.updateShowRating
);
showsRouter.put(
    "/:id/updates",
    updateAvailabilityValidation,
    showsController.updateShowStatus
);
showsRouter.delete("/:id", showsController.deleteShowById);

showsRouter.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

module.exports = showsRouter;
