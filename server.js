const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 3001;

const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const controllers = require('./controllers');

const hbs = exphbs.create({ helpers });

const app = express();

const sess = {
  secret: 'process.env.SESS_SECRET',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.use(controllers);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    const linkMsg =
      PORT === 3001
        ? 'Now live on port http://localhost:3001'
        : `Now live on port ${PORT}`;
    // eslint-disable-next-line no-console
    console.log(linkMsg);
  });
});
