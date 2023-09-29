const axios = require('axios');
const bcrypt = require('bcrypt');
const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const { username, email, celular, senha, facebook, instagram, endereco, bairro,
      cidade, cep, keymercadopago, premium = true} = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = new User({
      username,
      email,
      celular,
      senha: hashedPassword,
      facebook, 
      instagram,
      endereco,
      bairro,
      cidade,
      cep,
      keymercadopago,
      premium
    });

    await newUser.save();
    res.json({ success: true, user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Error creating user' });
  }
};

exports.getUserByUsername = async (req, res) => {//Rota para  isso?
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ Error: 'Usuário não encontrado.' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ Error: 'Erro ao obter usuário por username.' });
  }
};

exports.editUser = async (req, res) => {
  try {
    const { userid } = req.params;
    const { username: newUsername, email, celular, senha, facebook, instagram, endereco, bairro, cidade, cep, keymercadopago } = req.body;
    const user = await User.findOne({ userid });

    if (!user) {
      return res.status(404).json({ Error: 'Usuário não encontrado.' });
    }

    // Atualize apenas os campos que foram fornecidos no corpo da requisição
    if (newUsername) {
      user.username = newUsername;
    }
    if (email) {
      user.email = email;
    }
    if (celular) {
      user.celular = celular;
    }
    if (senha) {
      const hashedPassword = await bcrypt.hash(senha, 10);
      user.senha = hashedPassword;
    }
    if (facebook) {
      user.facebook = facebook;
    }
    if (instagram) {
      user.instagram = instagram;
    }
    if (endereco) {
      user.endereco = endereco;
    }
    if (bairro) {
      user.bairro = bairro;
    }
    if (cidade) {
      user.cidade = cidade;
    }
    if (cep) {
      user.cep = cep;
    }
    if (keymercadopago) {
      user.keymercadopago = keymercadopago;
    }

    await user.save();

    return res.status(200).json({ Message: 'Usuário atualizado com sucesso.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Error: 'Internal server error.' });
  }
};
