require('dotenv').config();
require('./services/passport');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
const adminRoute = require('./routes/admin');
const songRoute = require('./routes/song');
const commentRoute = require('./routes/comment');
const artistRoute = require('./routes/artist');

// const authMiddleware = require('./middlewares/auth.middleware');
// const upload = require('./middlewares/multer.middleware');

const app = express();

app.use(cors())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'secret'
})) 
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(methodOverride('_method'));

app.use(express.static('public'));

app.use('/auth', authRoute);
app.use('/profile', profileRoute);
app.use('/admin', adminRoute);
app.use('/song', songRoute);
app.use('/comment', commentRoute);
app.use('/artist', artistRoute);

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true 
})
    .then(() => app.listen(PORT, () => console.log(`Database is connected`)))
    .catch(error => console.log(`${error} did not connect`))