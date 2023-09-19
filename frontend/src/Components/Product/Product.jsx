import { useState } from 'react';
import axios from 'axios'; 
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Container,CardCreate ,CardProduct } from './ProductStyle';
import img from '../../img/613480.jpg';

export const Product = () => {
  initMercadoPago('TEST-19b333d1-e58f-411d-b45e-86d22a70ed82');

  const [preferenceId, setPreferenceId] = useState(null);
  const [namecode, setNamecode] = useState('');
  const [nameprice, setNameprice] = useState('');
  const [items, setItems] = useState([]);


  const createPreference = async () => {
    try {
      const response = await axios.post('http://localhost:4004/createorder', {
        description: 'Jow Jow',
        price: 50,
        quantity: 5,
        currency_id: 'BRL',
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    console.log('Botão apertado');
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
    console.log('Saindo da Req');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:4004/createitem', {
        code: namecode,
        price: nameprice,
      });
      
      setNamecode('');
      setNameprice('');
      
    } catch (error) {
      console.error(error);
    }
  };

  const loadItems = async () => {
    try {
      const response = await axios.get('http://localhost:4004/loaditems');
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDelete = async (itemId) => {
    try {
      await axios.delete(`http://localhost:4004/deleteitem/${itemId}`);
      loadItems();
    } catch (error) {
      console.error('Erro ao excluir item:', error);
    }
  };

  return (
    <Container>
      <CardProduct>
        <div className="card">
          <img src={img} alt="Product Image" />
          <h3>Happiness</h3>
          <p className="price">R$100</p>
          <button onClick={handleBuy}>Comprar com MercadoPago</button>
          {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </div>
      </CardProduct>
      <CardCreate>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Criar Items</h2>
            <label>Código:</label><br />
            <input
              type="text"
              name="namecode"
              placeholder="Código"
              value={namecode}
              onChange={(e) => setNamecode(e.target.value)}
              required
              /><br />
          </div>
          <div>
            <label>Preço:</label><br />
            <input
                type="text"
                name="nameprice"
                placeholder="Preço"
                value={nameprice}
                onChange={(e) => setNameprice(e.target.value)}
                required
                /><br />
            </div>
            <button type="submit">Criar Item</button>
        </form>
      </CardCreate>
      
      <CardCreate>
        <h2>Clique e veja os items:</h2>
        <ul>
        {items.map((item) => (
          <li key={item._id}>
            Código: {item.code}, Preço: R${item.price}
            <button>Editar</button>
            <button onClick={() => handleDelete(item._id)}>Excluir</button>
          </li>
        ))}
        </ul>
        <button onClick={loadItems}>Mostrar Items</button>
      </CardCreate>

    </Container>
  );
};
