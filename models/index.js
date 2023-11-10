const Show = require("./Show");
const User = require("./User");
const { db, DataTypes } = require("./../db/connection");

const watched = db.define("UserShowRating", {
    rating: DataTypes.INTEGER,
});

Show.belongsToMany(User, { through: watched });
User.belongsToMany(Show, { through: watched });

module.exports = {
    Show,
    User,
};
