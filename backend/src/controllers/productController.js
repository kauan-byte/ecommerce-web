const Product = require("../models/productModel");

exports.getAll = (req, res) => {
  Product.getAll((err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Erro ao buscar produtos",
      });
    }

    res.json(result);
  });
};

exports.getById = (req, res) => {
  Product.getById(req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Erro ao buscar produto",
      });
    }

    res.json(result[0]);
  });
};

exports.create = (req, res) => {
  Product.create(req.body, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Erro ao cadastrar produto",
      });
    }

    res.json({
      message: "Produto cadastrado",
    });
  });
};

exports.update = (req, res) => {
  Product.update(req.params.id, req.body, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Erro ao atualizar",
      });
    }

    res.json({
      message: "Produto atualizado",
    });
  });
};

exports.delete = (req, res) => {
  Product.delete(req.params.id, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Erro ao excluir",
      });
    }

    res.json({
      message: "Produto removido",
    });
  });
};

exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Nenhuma imagem enviada",
    });
  }

  res.json({
    imageUrl: `http://localhost:3000/uploads/${req.file.filename}`,
  });
};
