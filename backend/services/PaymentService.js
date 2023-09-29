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
      back_url: "https://tdiascontato.vercel.app/",
      payer_email: "test_user_2075727788@testuser.com"
    };

    const subscription = await axios.post(url, body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`//token vendedor
        }
    });
    return subscription.data;
  }
}

module.exports = PaymentService;