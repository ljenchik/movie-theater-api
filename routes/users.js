const usersRouter = require("express").Router();
const usersController = require("./../controllers/users");

usersRouter.get("/", usersController.allUsers);
usersRouter.get("/:id", usersController.userById);
usersRouter.get("/:id/shows", usersController.userShows);
usersRouter.put("/:id/shows/:showId", usersController.userUpdatedShows);
usersRouter.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

module.exports = usersRouter;
