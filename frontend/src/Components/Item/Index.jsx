import { useState, useEffect } from 'react';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Container, CardItem, CardProduct, Img, HThree, Pe, Button } from './IndexStyle';
import img from '../../img/613480.jpg';

export const Item = () => {
  // Chave pública -> pegar const cadastro?
  initMercadoPago("TEST-19b333d1-e58f-411d-b45e-86d22a70ed82");

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Carregar os itens quando o componente for montado
    loadItems();
  }, []);

  const createPreference = async (item) => {
    try {
      const response = await axios.post('http://localhost:4004/createorder', {
        description: item.code,
        price: item.price,
        quantity: 1,
        currency_id: 'BRL',
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async (item) => {
    console.log('Botão apertado');
    const id = await createPreference(item);
    if (id) {
      setSelectedItem({ ...item, preferenceId: id });
    }
    console.log('Saindo da Req');
  };

  const loadItems = async () => {
    try {
      const response = await axios.get(`http://localhost:4004/loaditems/`);
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      {items.length > 0 && (
        <CardProduct> 
          {items.map((item) => (
            <CardItem key={item._id}>
              <Img src={img} alt="Product Image" />
              <HThree>{item.code}</HThree>
              <Pe className="price">{`R$${item.price}`}</Pe>
              <Button onClick={() => handleBuy(item)}>Comprar com MercadoPago</Button>
              {selectedItem && selectedItem._id === item._id && (
                <Wallet initialization={{ preferenceId: selectedItem.preferenceId }} />
              )}
            </CardItem>
          ))}
        </CardProduct>
      )}
    </Container>
  );
};
