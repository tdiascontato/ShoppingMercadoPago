import { useEffect, useState } from 'react';
import axios from 'axios';
import { initMercadoPago } from '@mercadopago/sdk-react';
import {
  Container,
  CardCreate,
  CardItem,
  Form,
  HTwo,
  Label,
  Input,
  Button,
  Img,
  HThree,
  Ul,
  Li,
  SecondButton,
  Pe,
} from './IndexStyle';
import img from '../../img/613480.jpg';

export const Dashboard = () => {
  const user = JSON.parse(window.localStorage.getItem('user'));

  // Public Key Vendedor
  initMercadoPago(`${user.publicKey}`);

  const [editingItemId, setEditingItemId] = useState(null);
  const [editedCode, setEditedCode] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editSuccess, setEditSuccess] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [items, setItems] = useState([]);
  const [namecode, setNamecode] = useState('');
  const [nameprice, setNameprice] = useState('');
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [showEditDelete, setShowEditDelete] = useState(false);
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
    publicKey: '',
    accessToken: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4004/user/${user.username}`)
      .then((response) => {
        const accessToken = response.data.accessToken;
        initMercadoPago(accessToken);
        axios
          .post('http://localhost:4004/configureMercadoPago', { accessToken })
          .then(() => {
            console.log('MercadoPago configured successfully on the backend.');
          })
          .catch((error) => {
            console.error('Error configuring MercadoPago on the backend:', error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user.username]);

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
      const userId = response.data._id;
  
      const formData = new FormData();
      formData.append('code', namecode);
      formData.append('price', nameprice);
      formData.append('image', selectedImageFile); // selectedImageFile é o arquivo selecionado
  
      await axios.post(`http://localhost:4004/createitem/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Define o tipo de conteúdo como multipart/form-data
        },
      });
  
      setNamecode('');
      setNameprice('');
      setSelectedImageFile(null); // Limpa o arquivo selecionado
      loadItems();
    } catch (error) {
      console.error(error);
    }
  };

  const loadItems = async () => {
    try {
      const response = await axios.get(`http://localhost:4004/loaditems/`);
      const responseTwo = await axios.get(`http://localhost:4004/user/${user.username}`);
      const userId = responseTwo.data._id;
      const idResponse = response.data;
      const userItems = await idResponse.filter((item) => item.createdBy === userId);
      setItems(userItems);
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
      setEditingItemId(null);
      loadItems();
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error);
    }
  };

  const editUser = async () => {
    setIsEditingUser(!isEditingUser);
  };

  const handleEditUserFieldChange = (fieldName, value) => {
    setEditedUser((prevEditedUser) => ({
      ...prevEditedUser,
      [fieldName]: value,
    }));
  };

  const handleSaveUser = async () => {
    try {
      await axios.put(`http://localhost:4004/updateuser/${user.username}`, {
        username: editedUser.username,
        email: editedUser.email,
        celular: editedUser.celular,
        senha: editedUser.senha,
        facebook: editedUser.facebook,
        instagram: editedUser.instagram,
        endereco: editedUser.endereco,
        bairro: editedUser.bairro,
        cidade: editedUser.cidade,
        cep: editedUser.cep,
        publicKey: editedUser.publicKey,
        accessToken: editedUser.accessToken,
      });
      setEditSuccess(true);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:4004/deleteuser/${user.username}`);
      logOut();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  //logout
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = '/';
  };
  
  const canCreateItem = items.length < 2;
  
  return (
    <Container>
      <CardCreate className="Card">
        <HTwo>Hello {user.username}</HTwo>
        {canCreateItem && (
        <Form onSubmit={handleSubmit}>
          <HTwo>Criar Itens</HTwo>

          <input type='file' name='image' />{/*Salvar imagem dos items*/}
          
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
         )}
      </CardCreate>

      <CardCreate className="Card">
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

        <Button onClick={logOut} className="Logout">
          Log Out
        </Button>

        <Button onClick={deleteUser} className="Delete">
          Deletar Conta
        </Button>
      </CardCreate>

      <CardCreate className="Card">
        <HTwo>Edit {user.username}</HTwo>
        <Button onClick={editUser}>Editar!</Button>
        {isEditingUser ? (
          <>
            <div className="editUser">
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
              <Label>Public Key:</Label>
              <Input
                type="text"
                name="publicKey"
                placeholder="Edit Public Key"
                value={editedUser.publicKey}
                onChange={(e) => handleEditUserFieldChange('publicKey', e.target.value)}
              />
              <Label>Access Token:</Label>
              <Input
                type="text"
                name="accessToken"
                placeholder="Edit Access Token"
                value={editedUser.accessToken}
                onChange={(e) => handleEditUserFieldChange('accessToken', e.target.value)}
              />

              <Button onClick={handleSaveUser}>Save User</Button>

              {editSuccess && (
                <div className="alert-success">
                  Usuário editado com sucesso! A página será recarregada em breve.
                </div>
              )}
            </div>
            <Button className="Logout" onClick={() => setIsEditingUser(false)}>
              Fechar
            </Button>
          </>
        ) : null}
      </CardCreate>
    </Container>
  );
};
