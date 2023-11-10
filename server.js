const app = require("./src/app");
const PORT = 3000;
const { db } = require("./db/connection");

app.listen(PORT, () => {
    db.sync({});
    console.log(`Listening at http://localhost:${PORT}/`);
});
