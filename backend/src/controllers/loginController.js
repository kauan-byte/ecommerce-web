const jwt = require("jsonwebtoken");

const usermModel = require("../models/userModel");

const SECRET_KEY = "segredo123";

exports.login = async (req, res) => {
  const { email, password } = req.body;
  usermModel.findByEmail(email, (user) => {
    if (!user) {
      return res.status(401).json({
        message: "Usuário não encontrado",
      });
    }
    if (user.password !== password) {
      return res.status(401).json({
        message: "Senha incorreta",
      });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" },
    );
    res.json({
      message: "Login bem-sucedido",
      token,
    });
  });
};
