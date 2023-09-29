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
  const [status, setStatus] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: '',
    email: '',
    celular: '',
    senha: '',
    facebook: '',
    instagram: '',
    endereco: '',
    bairro: '',
    cidade: '',
    cep: '',
    keymercadopago: '',
  });


  useEffect(() => { 
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (editSuccess) {
      setTimeout(() => {
        setEditSuccess(false);
        window.location.reload();
      }, 2000);
    }
  }, [editSuccess]);

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
      // Verifique se a resposta possui o campo init_point
      if (subscription.data.init_point) {
        // Redirecione a página para init_point
        setStatus(true);
        window.location.href = subscription.data.init_point;
      } else {
        console.error('Resposta inválida da API de inscrição');
      }
    } catch (error) {
      console.error(error);
    }
  };
/*
  const subscheck = async () => {
    try{
      const response = await axios.get(`http://localhost:4004/user/${user.username}`);
      const email = response.data.email; // Obtém o email do usuário
      const subscription = await axios.get(`https://api.mercadopago.com/preapproval/${email}`);
      subscription ? console.log(subscription) : console.log("Não foi encontrado assinatura");
    }catch(err){
      console.error(err)
    }
  }
  */

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

  const editUser = async () =>{
    setIsEditingUser(!isEditingUser); 
  }

  const handleEditUserFieldChange = (fieldName, value) => {
    setEditedUser((prevEditedUser) => ({
      ...prevEditedUser,
      [fieldName]: value,
    }));
  };
  
  
  const handleSaveUser = async () => {
    try {
      const response = await axios.put(`http://localhost:4004/updateuser/${user.username}`, editedUser);
      console.log(response.data);
      setEditSuccess(true);
    } catch (error) {
      console.error('Error updating user:', error);
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
        <HTwo>Edit {user.username}</HTwo>
        <Button onClick={editUser}>Editar!</Button> {/*Botão para criar formulário para editar usuário*/}
        {isEditingUser ? (
          <>
          <div className='editUser'>
            <Label>Username:</Label>
            <Input
              type="text"
              name="username"
              placeholder="Edit Username"
              value={editedUser.username}
              onChange={(e) => handleEditUserFieldChange('username', e.target.value)}
            />
            <Label>Email:</Label>
            <Input
              type="text"
              name="email"
              placeholder="Edit Email"
              value={editedUser.email}
              onChange={(e) => handleEditUserFieldChange('email', e.target.value)}
            />
            <Label>Celular:</Label>
            <Input
              type="text"
              name="celular"
              placeholder="Edit Celular"
              value={editedUser.celular}
              onChange={(e) => handleEditUserFieldChange('celular', e.target.value)}
            />
            <Label>Senha:</Label>
            <Input
              type="password"
              name="senha"
              placeholder="Edit Senha"
              value={editedUser.senha}
              onChange={(e) => handleEditUserFieldChange('senha', e.target.value)}
            />
            <Label>Facebook:</Label>
            <Input
              type="text"
              name="facebook"
              placeholder="Edit Facebook"
              value={editedUser.facebook}
              onChange={(e) => handleEditUserFieldChange('facebook', e.target.value)}
            />
            <Label>Instagram:</Label>
            <Input
              type="text"
              name="instagram"
              placeholder="Edit Instagram"
              value={editedUser.instagram}
              onChange={(e) => handleEditUserFieldChange('instagram', e.target.value)}
            />
            <Label>Endereco:</Label>
            <Input
              type="text"
              name="endereco"
              placeholder="Edit Endereco"
              value={editedUser.endereco}
              onChange={(e) => handleEditUserFieldChange('endereco', e.target.value)}
            />
            <Label>Bairro:</Label>
            <Input
              type="text"
              name="bairro"
              placeholder="Edit Bairro"
              value={editedUser.bairro}
              onChange={(e) => handleEditUserFieldChange('bairro', e.target.value)}
            />
            <Label>Cidade:</Label>
            <Input
              type="text"
              name="cidade"
              placeholder="Edit Cidade"
              value={editedUser.cidade}
              onChange={(e) => handleEditUserFieldChange('cidade', e.target.value)}
            />
            <Label>Cep:</Label>
            <Input
              type="text"
              name="cep"
              placeholder="Edit Cep"
              value={editedUser.cep}
              onChange={(e) => handleEditUserFieldChange('cep', e.target.value)}
            />
            <Label>Keymercadopago:</Label>
            <Input
              type="text"
              name="keymercadopago"
              placeholder="Edit Keymercadopago"
              value={editedUser.keymercadopago}
              onChange={(e) => handleEditUserFieldChange('keymercadopago', e.target.value)}
            />
            
            <Button onClick={handleSaveUser}>Save User</Button>

            {editSuccess && (
              <div className="alert-success">
                Usuário editado com sucesso! A página será recarregada em breve.
              </div>
            )}

          </div>
          <Button className='Logout' onClick={() => setIsEditingUser(false)}>Fechar</Button>
          </>
        ) : null}
      </CardCreate>

      <CardCreate className='Card'>
        <HTwo >Premium</HTwo>
        <Button onClick={handleSubscription}>Clicar</Button>
        {status ? 
        <Button className='premium'>Você é PREMIUM!</Button>
        : ""
        }
      </CardCreate>

      
    </Container>
  );
};
