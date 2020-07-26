var mercadopago = require("mercadopago");
mercadopago.configurations.setAccessToken(
  "TEST-3807724980483408-072112-5cb501d261b27deb573e6b9643403d36-376016011"
);

exports.PaymentApiMp = (data) => {
  mercadopago.configure({
    access_token:
      "TEST-3807724980483408-072112-5cb501d261b27deb573e6b9643403d36-376016011",
  });
  var payment_data = {
    transaction_amount: data.total,
    token: data.token,
    installments: parseInt(data.datosTarjeta.installments),
    payment_method_id: data.datosTarjeta.paymentMethodId,
    payer: {
      email: data.detallesEnvio.email,
    },
  };
console.log(data.installments)
  return mercadopago.payment.create(payment_data);
};
