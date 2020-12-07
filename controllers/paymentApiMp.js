var mercadopago = require("mercadopago");
mercadopago.configurations.setAccessToken(
  process.env.APITOKENMP
);

exports.PaymentApiMp = (data) => {
  mercadopago.configure({
    access_token:process.env.APITOKENMP
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
