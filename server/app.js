const brokerService = require("./services/mensageria");
const express = require("express");

const app = express();
const port = 4001;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

app.get("/", (req, res) => {
  const msg = "status:ok!";
  console.log("GET / >>> ", msg);
  res.send(msg);
});

app.get("/enviar", (req, res) => {
  const msg = "msg:ok!";
  console.log("GET /n >>> ", msg);
  brokerService.enviarMensagemExchange("amq.direct", "rota_testes", msg);
  res.send(msg);
});
