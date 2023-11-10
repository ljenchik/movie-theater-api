const usersRouter = require("express").Router();
const usersController = require("./../controllers/users");

usersRouter.get("/", usersController.allUsers);
usersRouter.get("/:id", usersController.userWithId);
usersRouter.get("/:id/shows", usersController.userWithShows);
usersRouter.put("/:id/shows", usersController.userWithUpdatedShows);
usersRouter.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

module.exports = usersRouter;
