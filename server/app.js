const {
  enviarMensagemExchange,
  consumirFila,
} = require("./services/mensageria");

const express = require("express");

const app = express();

const port = 5001;

app.listen(port, () => {
  console.log(`Server running on ${port}...`);
});

app.get("/", (req, res) => {
  console.log("test ok!");
  res.send("test ok!");
});

app.get("/enviar", (req, res) => {
  console.log("Enviando mensagem...");
  const exchange = "amq.direct";
  const routing_key = "rota_testes";
  const mensagem = "testando " + new Date().toISOString();

  enviarMensagemExchange(exchange, routing_key, mensagem);
  res.send("Enviando mensagem...");
});

app.get("/receber", (req, res) => {
  console.log("Ativando recebimento de mensagem...");

  res.send("Ativando recebimento de mensagem...");
});

consumirFila("fila_teste", (msg) => {
  console.log("Recebeu com sucesso :", { msg });
});
