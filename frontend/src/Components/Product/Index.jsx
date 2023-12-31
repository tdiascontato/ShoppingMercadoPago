import { useState, useEffect } from 'react';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Container, CardCreate, CardItem, CardProduct } from './IndexStyle';
import img from '../../img/613480.jpg';
import { Link } from 'react-router-dom';

export const Product = () => {
  // Chave pública
  initMercadoPago("TEST-19b333d1-e58f-411d-b45e-86d22a70ed82");

  const [namecode, setNamecode] = useState('');
  const [nameprice, setNameprice] = useState('');
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedCode, setEditedCode] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [showEditDelete, setShowEditDelete] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:4004/createitem', {
        code: namecode,
        price: nameprice,
      });

      setNamecode('');
      setNameprice('');
      // Recarregar os itens após a criação de um novo item
      loadItems();
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
      // Recarregar os itens após a exclusão de um item
      loadItems();
    } catch (error) {
      console.error('Erro ao excluir item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItemId(item._id);
    setEditedCode(item.code);
    setEditedPrice(item.price);
  };

  const handleSaveEdit = async (item) => {
    try {
      await axios.put(`http://localhost:4004/updateitem/${item._id}`, {
        code: editedCode,
        price: editedPrice,
      });
      setEditingItemId(null); // Sai do modo de edição após a conclusão
      // Recarregar os itens após a edição
      loadItems();
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  //logout
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "/";
  };
  

  return (
    <Container>
      {items.length > 0 && (
        <CardProduct>
          {items.map((item) => (
            <CardItem key={item._id}>
              <img src={img} alt="Product Image" />
              <h3>{item.code}</h3>
              <p className="price">{`R$${item.price}`}</p>
              <button onClick={() => handleBuy(item)}>Comprar com MercadoPago</button>
              {selectedItem && selectedItem._id === item._id && (
                <Wallet initialization={{ preferenceId: selectedItem.preferenceId }} />
              )}
            </CardItem>
          ))}
        </CardProduct>
      )}

      <CardCreate>
        <form onSubmit={handleSubmit}>
          <div>
            <h2>Criar Itens</h2>
            <label>Código:</label>
            <br />
            <input
              type="text"
              name="namecode"
              placeholder="Código"
              value={namecode}
              onChange={(e) => setNamecode(e.target.value)}
              required
            />
            <br />
          </div>
          <div>
            <label>Preço:</label>
            <br />
            <input
              type="text"
              name="nameprice"
              placeholder="Preço"
              value={nameprice}
              onChange={(e) => setNameprice(e.target.value)}
              required
            />
            <br />
          </div>
          <button type="submit">Criar Item</button>
        </form>
      </CardCreate>

      <CardCreate>
        <h2>Clique e veja os itens:</h2>
        <button onClick={() => setShowEditDelete(!showEditDelete)}>
          {showEditDelete ? 'Esconder Itens' : 'Mostrar Itens'}
        </button>
        {showEditDelete && (
          <ul>
            {items.map((item) => (
              <li key={item._id}>
                {editingItemId === item._id ? (
                  // Modo de edição
                  <>
                    <label>Código:</label>
                    <input
                      type="text"
                      value={editedCode}
                      onChange={(e) => setEditedCode(e.target.value)}
                    />
                    <label>Preço:</label>
                    <input
                      type="text"
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(e.target.value)}
                    />
                    <button onClick={() => handleSaveEdit(item)}>Salvar</button>
                  </>
                ) : (
                  // Modo de visualização
                  <CardItem>
                    <img src={img} alt="Product Image" />
                    <h3>{item.code}</h3>
                    <p className="price">{`R$${item.price}`}</p>
                    <button onClick={() => handleEdit(item)}>Editar</button>
                    <button onClick={() => handleDelete(item._id)}>Excluir</button>
                  </CardItem>
                )}
              </li>
            ))}
          </ul>
        )}
      <Link to="/product">Produtos</Link>
      <Link to="/cadastro">Cadastro</Link>
      <button onClick={logOut}>
          Log Out
        </button>
      </CardCreate>
    </Container>
  );
};
