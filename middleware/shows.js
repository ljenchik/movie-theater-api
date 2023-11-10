const { check } = require("express-validator");

module.exports = {
    updateRatingValidation: [check("rating").not().isEmpty().trim()],
    updateAvailabilityValidation: [
        check("available").not().isEmpty().trim(),
        check("available").isBoolean(),
    ],
};
