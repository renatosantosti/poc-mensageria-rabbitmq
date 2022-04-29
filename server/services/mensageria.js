const amqp = require("amqplib");

const usuario = "admin";
const senha = "admin";
const host = "127.0.0.1";
const porta = "5672";
const uri = `amqp://${usuario}:${senha}@${host}:${porta}`;
//const uri = `amqp://${host}:${porta}`;

const obterCanal = (uri) => {
  console.log("Tentando conexão >>> ", uri);
  return amqp
    .connect(uri)
    .then((conn) => {
      return conn.createChannel();
    })
    .catch((err) => {
      console.log("Erro ao tentar conectar em:", { uri, err });
    });
};

const enviarMensagemExchange = (exchange, routing_key, mensagem) => {
  obterCanal(uri).then((canal) => {
    canal.publish(
      exchange,
      routing_key,
      Buffer.from(mensagem),
      (err, ok) => {
        console.log("tentando enviar, retorno:", { err, ok });
      }
      //   .then((err, ok) => {

      //   })
      //   .catch((err) => {
      //     console.log("Erro ao tentar enviar mensagem em:", {
      //       exchange,
      //       routing_key,
      //       err,
      //     });
      //   });
    );
  });
};

const consumirFila = (fila, cbProcessarMensagem) => {
  obterCanal(uri).then((canal) => {
    canal
      .consume(fila)
      .then((msg) => {
        if(msg && msg.content) {
          console.log(" [x] %s", msg.content.toString());
        }
        cbProcessarMensagem(msg)
      }, {noAck: true})
      .catch((err) => {
        console.error("Erro ao tentar consumir mensagens: ", { fila, err });
      });
  });
};

module.exports = {
  enviarMensagemExchange,
  consumirFila,
};
