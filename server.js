const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require('./app/models');
const Role = db.role

const app = express();

const corsOptions = {
    origin: "http://localhost:8081"
  };

  app.use(cors(corsOptions));

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });


  db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
  });
  

  const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

require('./app/routes/auth.routes')(app);
require('./app/routes/users.routes')(app);

function initial(){
    Role.create({
        id : 1 ,
        name : "User"
    });

    Role.create({
        id: 2,
        name: "moderator"
      });

    Role.create({
        id: 3,
        name: "admin"
    });
}