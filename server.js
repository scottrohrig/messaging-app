const path = require('path');
const express = require('express');
const sequelize = require('./config/connection');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const routes = require('./controllers');

const sess = {
  secret: process.env.SESS_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// setup socket.io
io.on('connection', (socket) => {
  socket.on('new message', (message) => {
    io.emit('new message', message);
  });
});

app.use(session(sess));


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    const linkMsg =
      PORT === 3001
        ? 'Now live on port http://localhost:3001'
        : `Now live on port ${PORT}`;
    // eslint-disable-next-line no-console
    console.log(linkMsg);
  });
});
