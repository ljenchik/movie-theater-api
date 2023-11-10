const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { usersRouter, showsRouter } = require("./../routes");

app.use("/users", usersRouter);
app.use("/shows", showsRouter);

module.exports = app;
