const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const todoRouter = express.Router();
const cors = require("cors");
var port = 4000;
var todomodel = require("./models/todo-model");
var { User } = require("./models/user-model");
var { authenticate } = require("./Middleware/Authentication");
const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/tododb", { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb data base is connected");
});

todoRouter.route("/").get((req, res) => {
  todomodel.find((err, todos) => {
    if (err) console.log(err);
    else res.json(todos);
  });
});

todoRouter.route("/:id").get((req, res) => {
  var id = req.params.id;
  todomodel.findById(id, (err, todo) => {
    if (err) console.log(err);
    else {
      res.json(todo);
    }
  });
});

todoRouter.route("/add").post((req, res) => {
  var todo = new todomodel(req.body);
  todo
    .save()
    .then(todo => {
      res.status(200).json({ todo: "todo is added" });
    })
    .catch(err => {
      res.status(400).send("adding new todo failed");
    });
});

app.post("/users", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);

  var user = new User(body);
  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header("x-auth", token).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

// todoRouter.route("/users/me").get(authenticate, (req, res) => {
//   res.send(req.user);
// });

app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});
todoRouter.route("/update/:id").post((req, res) => {
  todomodel.findById(req.params.id, (todo, err) => {
    console.log(todo);
    if (!todo) res.status(404).send("data not found");
    else {
      todo.name = req.body.name;
      todo.priority = req.body.priority;
      todo.completed = req.body.completed;

      todo
        .save()
        .then(todo => {
          res.status(200).json("data updated");
        })
        .catch(err => {
          res.status(400).send("Update not possible");
        });
    }
  });
});

app.use("/todos", todoRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
