require('dotenv').config();
module.exports = {
    dbURI: process.env.DB_URL,
    port: process.env.PORT || 5000,
};
