
const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");

app.use(express.json());
app.use(cors());

//Chave privada vendedor
mercadopago.configure({
    access_token: "TEST-3145117132343180-091613-d0cadff189a74b3f6fb465ef29641e76-1482597424",
});

//routes
app.get("/", (req, res)=> res.send("Lest's go?"));
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
app.listen(4004, () => {
    console.log(`Estamos rodando em http://localhost:4004/`);
  });