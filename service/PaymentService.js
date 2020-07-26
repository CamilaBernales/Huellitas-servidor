//este archivo no esta siendo usado

const axios = require("axios");
exports.createPaymentMercadoPago = async (compras) => {
  let access_token =
    "APP_USR-3807724980483408-072112-2f213bf65ab7fd9bbbfc48072d1d6937-376016011"; //pasar esto a env
  let mercadoPagoUrl = "https://api.mercadopago.com/checkout"; 
  const url = `${mercadoPagoUrl}/preferences?access_token=${access_token}`;

  const items = [];
  for (let index = 0; index < compras.length; index++) {
    let element = compras[index];
    items.push({
      title: element.nombre,
      description: "algo",
      category_id: "1234",
      quantity: parseInt(element.cantidad),
      currency_id: "ARS",
      unit_price: parseFloat(element.precio),
    });
  }
  const preferences = {
    //preferencias del servicio
    items,
    external_reference: "",
    payer: {
      name: "ana",
      password: "qatest5140",
      surname: "mercado",
      email: "camilabernales@gmail.com",
      phone: {
        area_code: "381",
        number: "22223333",
      },
      address: {
        zip_code: "4000",
        street_name: "False",
        street_number: "123",
      },
    },
    payment_methods: {
      excluded_payment_methods: [
        {
          id: "amex",
        },
      ],
      excluded_payment_types: [{ id: "atm" }],
      installments: 6,
      default_installments: 6,
    },
    back_urls: {
      success: "http://localhost:3000/miscompras",
      pending: "http://localhost:3000.com/miscompras", //si decide pagar en efectivo
      failure: "http://localhost:3000.com/carrito",
    },
    notification_url: "http://localhost:4000/veterinariamern", //link backend?
    auto_return: "approved",
  };

  try {
    const request = await axios.post(url, preferences, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return request.data;
    // respuesta de la ruta
  } catch (error) {
    console.log(error);
  }
};
