// Module Includes
//=============================================================================================
const mongoose = require('mongoose');


// Connect to MongoDB
//=============================================================================================

/**
 * Initializes a global connection to a mongodb database.
 */
function init(databaseURL, databaseName) {
    mongoose.connect(
        databaseURL + databaseName, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    const db = mongoose.connection;

    db.on('error', function (err) {
        console.error(err);
    });

    db.on('open', function () {
        console.log(`Connected to MongoDB on ${databaseURL + databaseName}`);
    });
}

module.exports = init;
