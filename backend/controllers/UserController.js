const axios = require('axios');
const bcrypt = require('bcrypt');
const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const { username, email, celular, senha, facebook, instagram } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = new User({
      username,
      email,
      celular,
      senha: hashedPassword,
      facebook, 
      instagram,
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