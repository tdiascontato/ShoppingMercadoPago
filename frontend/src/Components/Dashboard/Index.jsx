import { useEffect, useState } from 'react';
import axios from 'axios';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { Container, CardCreate, CardItem, Form, HTwo, Label, Input, Button, Img, HThree, Ul, Li, SecondButton, Pe} from './IndexStyle';
import img from '../../img/613480.jpg';

export const Dashboard = () => {
  // Chave pública
  initMercadoPago("TEST-19b333d1-e58f-411d-b45e-86d22a70ed82");

  const user = JSON.parse(window.localStorage.getItem("user"));
  const [namecode, setNamecode] = useState('');
  const [nameprice, setNameprice] = useState('');
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedCode, setEditedCode] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [showEditDelete, setShowEditDelete] = useState(false);

  useEffect(() => { 
    loadItems(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.get(`http://localhost:4004/user/${user.username}`);
      const userId = response.data._id; // Obtém o _id do usuário
  
      await axios.post(`http://localhost:4004/createitem/${userId}`, {
        code: namecode,
        price: nameprice,
      });
  
      setNamecode('');
      setNameprice('');
      loadItems();
    } catch (error) {
      console.error(error);
    }
  };
  
  const loadItems = async () => {
    try {
      const response = await axios.get(`http://localhost:4004/loaditems/`);
      const responseTwo = await axios.get(`http://localhost:4004/user/${user.username}`);
      const userId = responseTwo.data._id; // Obtém o _id do usuário
      const idResponse = response.data;
      const userItems = await idResponse.filter((item) => item.createdBy == userId);
      setItems(userItems);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleSubscription = async () => {
    try {
      const subscription = await axios.get('http://localhost:4004/subscription');
      console.log('Enviei', subscription.data.init_point);
    } catch (error) {/*Parei 26.09*/
      console.log(error);
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
      loadItems();// Recarregar os itens após a edição
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

      <CardCreate className='Card'>
        <HTwo>Hello {user.username}</HTwo>
        <Form onSubmit={handleSubmit}>
            <HTwo>Criar Itens</HTwo>
            <Label>Código:</Label>
            <Input
              type="text"
              name="namecode"
              placeholder="CÓDIGO"
              value={namecode}
              onChange={(e) => setNamecode(e.target.value)}
              required
            />
            <Label>Preço:</Label>
            <Input
              type="text"
              name="nameprice"
              placeholder="PREÇO"
              value={nameprice}
              onChange={(e) => setNameprice(e.target.value)}
              required
            />
          <Button type="submit">Criar Item</Button>
        </Form>
      </CardCreate>

      <CardCreate className='Card'>
        <HTwo>Clique e veja os itens:</HTwo>
        <Button onClick={() => setShowEditDelete(!showEditDelete)}>
          {showEditDelete ? 'Esconder Itens' : 'Mostrar Itens'}
        </Button>
        
        {showEditDelete && (
          <Ul>
            {items.map((item) => (
              <Li key={item._id}>
                {editingItemId === item._id ? (
                  // Modo de edição
                  <>
                    <Label>Código:</Label>
                    <Input
                      type="text"
                      value={editedCode}
                      onChange={(e) => setEditedCode(e.target.value)}
                    />
                    <Label>Preço:</Label>
                    <Input
                      type="text"
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(e.target.value)}
                    />
                    <Button onClick={() => handleSaveEdit(item)}>Salvar</Button>
                  </>
                ) : (
                  // Modo de visualização
                  <CardItem>
                      <Img src={img} alt="Product Image" />
                      <HThree>{item.code}</HThree>
                      <Pe className="price">{`R$${item.price}`}</Pe>
                      <SecondButton onClick={() => handleEdit(item)}>Editar</SecondButton>
                      <SecondButton onClick={() => handleDelete(item._id)}>Excluir</SecondButton>
                  </CardItem>
                )}
              </Li>
            ))}
          </Ul>
        )}
      
      <Button onClick={logOut} className='Logout'>
        Log Out
      </Button>
      </CardCreate>

      <CardCreate className='Card'>
        <HTwo>Edit User</HTwo>
        <Button>Editar!</Button>
      </CardCreate>
      
      <CardCreate className='Card'>
        <HTwo >Premium</HTwo>
        <Button onClick={handleSubscription}>Clicar</Button>
      </CardCreate>

      
    </Container>
  );
};
