import { useState } from 'react';
import axios from "axios";
import {initMercadoPago,  Wallet} from "@mercadopago/sdk-react";

import { Container, CardProduct } from './ProductStyle';
import img from '../../img/613480.jpg';

export const Product = () => {

  //chave pública do vendedor
  const key = "TEST-19b333d1-e58f-411d-b45e-86d22a70ed82";
  initMercadoPago(key);

  const [preferenceId, setPreferenceId] = useState(null);
  
  const createPreference = async () => {
    try {
      const response = await axios.post("http://localhost:4004/createorder", {
        description: "Jow Jow",
        price: 50,
        quantity: 5,
        currency_id: "BRL",
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async() => {
    console.log("Botão apertado")
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
    console.log("Saindo da Req")
  }; 

  return (
    <Container>
      <CardProduct>
        <div className='card'>
          <img src={img} alt='Product Image'/>
          <h3>Happiness</h3>
          <p className='price'>R$100</p>
          <button onClick={handleBuy}>Comprar com MercadoPago</button>
            {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </div>
      </CardProduct>
    </Container>
  )
}
