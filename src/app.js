const express = require("express");
const app = app.express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;
