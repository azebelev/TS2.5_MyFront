import express from 'express';
import login from './routes/login';
import register from './routes/register';
import logout from './routes/logout';
import items from './routes/items';
import router from './routes/router';
import session from 'express-session';
import mongoose, { ConnectOptions } from 'mongoose';
import connectionMongo from 'connect-mongodb-session';
const MongoStore = connectionMongo(session);
import cors from 'cors';


const app = express();

const PORT = 8080;
const MONGODB_URI = 'mongodb+srv://andrew:zheb2501@cluster0.fi69x.mongodb.net/problemBook';
const store = new MongoStore({
  collection: 'sessions',
  uri: MONGODB_URI
});

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false,
  store
}));


app.use('/api/v1/items', items);
app.use('/api/v1/login', login);
app.use('/api/v1/logout', logout);
app.use('/api/v1/register', register);
app.use('/api/v2/router', router);

async function startServing() {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
  } as ConnectOptions);

  app.listen(PORT, () => {
    console.log(`server on port ${PORT}`)
  });

};

startServing();

