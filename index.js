const express = require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')


// Router
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');

dotenv.config();

// Database connexion

try {
    mongoose.connect( process.env.DB_CONNEXION, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
        console.log("Database connected successfully"));
}catch (error) {
    console.log("could not connect to database");
}


//Middleware
app.use(express.json())
app.use('/api/user',authRouter);
app.use('/api/posts',postRouter);

app.listen(3000, console.log("Server Up and Running"));
