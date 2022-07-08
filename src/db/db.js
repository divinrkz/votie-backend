const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

/**
 * Connect to DB
 */
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useFindAndModify: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log ('MongoDB is connected')
    }
    catch(err) {
        console.error(err);
        process.exit(1);
    }
};




connectDB();