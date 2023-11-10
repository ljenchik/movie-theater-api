const Show = require("./Show");
const User = require("./User");
const { db, DataTypes } = require("./../db/connection");

const UserShowRating = db.define("userShowRating", {
    rating: DataTypes.INTEGER,
});

Show.belongsToMany(User, { through: UserShowRating });
User.belongsToMany(Show, { through: UserShowRating });

module.exports = {
    Show,
    User,
    UserShowRating,
};
