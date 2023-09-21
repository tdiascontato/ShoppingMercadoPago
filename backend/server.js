require("dotenv/config");
const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");
const connectDB = require('./database.js');
const ItemController = require('./controllers/ItemController.js');
const UserController = require("./controllers/UserController");
connectDB();
app.use(express.json());
app.use(cors());


//Chave DE ACESSO vendedor
mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
});

//routes
app.put("/updateitem/:id", ItemController.update);
app.delete("/deleteitem/:id", ItemController.destroy);
app.get("/loaditems", ItemController.index);
app.post("/login", UserController.login);
app.post("/cadastro", UserController.createUser);
app.post("/createitem", ItemController.create);
app.post("/createorder", (req, res) => {
    //Mandando para API
    let preference = {
      items: [
        {
          title: req.body.description,
          unit_price: Number(req.body.price),
          quantity: Number(req.body.quantity),
        },
      ],
      back_urls: {
        success: "http://localhost:5173",
        failure: "https://tdiascontato.vercel.app",
        pending: "",
      },
      auto_return: "approved",
    };

    mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});



//Canal Servidor
app.listen(process.env.PORT, () => {
    console.log(`Estamos rodando em http://localhost:${process.env.PORT}/`);
  });