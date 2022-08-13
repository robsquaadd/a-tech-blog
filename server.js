const express = require("express");
const routes = require("./controllers");
const path = require("path");
const sequelize = require("./config/connection");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
  secret: "So, So Secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
};

const app = express();
const hbs = exphbs.create({});
const PORT = process.env.PORT || 3001;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Now listening!");
  });
});
