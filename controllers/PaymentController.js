//este archivo no esta siendo usado


const PaymentService = require("../service/PaymentService");

exports.createMercadoPagoLink = async (req, res) => {
  const {compras } = req.body;
  console.log(compras)
  try {
    const checkout = await PaymentService.createPaymentMercadoPago(
    compras
    );

    return res.status(200).json({ url: checkout.init_point });
  } catch (err) {
      console.log(err)
    return res.status(500).json({
      err: err,
      msg: "Hubo un error con Mercado Pago",
    });
  }
};

exports.webhook = function (req, res) {
  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      console.log(body, "webhook response");
      res.end("ok");
    });
  }
  return res.status(200);
};
