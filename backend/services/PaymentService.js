const axios = require("axios");

class PaymentService {

  async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";
    //assinatura
    const body = {
      reason: "Assinatura",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "BRL"
      },
      back_url: "https://google.com.br",
      payer_email: "test_user_2103390560@testuser.com"//email comprador
    };

    const subscription = await axios.post(url, body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`//token vendedor
        }
    });
    //console.log("Cheguei em PaymentService:", subscription.data.init_point);
    return subscription.data;
  }
}

module.exports = PaymentService;