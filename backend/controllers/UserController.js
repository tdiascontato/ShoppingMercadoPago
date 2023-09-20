const User = require("../models/User");

// Rota para cadastrar um novo usuário
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Erro ao cadastrar usuário" });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body; // Make sure the field names match the request body.

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, error: 'User not found' });
    }

    // Compare the plain-text password with the stored plain-text password.
    if (senha !== user.senha) {
      return res.status(400).json({ success: false, error: 'Incorrect password' });
    }

    res.json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, error: 'Error during login', detailedError: error.message }); // Provide a detailed error message for debugging.
  }
};

