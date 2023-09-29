import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Container, CardItem, CardProduct, Img, HThree, Pe, Button } from './IndexStyle';
import img from '../../img/613480.jpg';

export const Item = () => {
  // Chave pública -> pegar const cadastro?
  initMercadoPago("TEST-19b333d1-e58f-411d-b45e-86d22a70ed82");
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // Usando useCallback para memoizar a função loadItem
  const loadItem = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:4004/searchitem/${id}`);
      setItem(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [id]); // Adicione id como uma dependência

  useEffect(() => {
    // Carregar o item quando o componente for montado
    loadItem();
  }, [loadItem]); // Passando loadItem como dependência

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

  return (
    <Container>
      {item && (
        <CardProduct>
          <CardItem key={item._id}>
            <Img src={img} alt="Product Image" />
            <HThree>{item.code}</HThree>
            <Pe className="price">{`R$${item.price}`}</Pe>
            <Button onClick={() => handleBuy(item)}>Comprar com MercadoPago</Button>
            {selectedItem && selectedItem._id === item._id && (
              <Wallet initialization={{ preferenceId: selectedItem.preferenceId }} />
            )}
            <Pe><Link to="/" className='homeButton'>Voltar para a Home</Link></Pe>
          </CardItem>
        </CardProduct>
      )}
    </Container>
  );
};
