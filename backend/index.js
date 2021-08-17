require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const songRoute = require('./routes/song');
const commentRoute = require('./routes/comment');
const artistRoute = require('./routes/artist');
const playlistRoute = require('./routes/playlist');

const app = express();

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(methodOverride('_method'));

app.use(express.static('public'));

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.use('/song', songRoute);
app.use('/comment', commentRoute);
app.use('/artist', artistRoute);
app.use('/playlist', playlistRoute);

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true 
})
    .then(() => app.listen(PORT, () => console.log(`Database is connected`)))
    .catch(error => console.log(`${error} did not connect`))