const express = require("express");
const cors = require("cors");
const loginRoutes = require("./src/routes/loginRoutes");
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/login", loginRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
