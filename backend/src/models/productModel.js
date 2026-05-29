const db = require("../config/database");

exports.getAll = (callback) => {
  db.query("SELECT * FROM produtos", callback);
};

exports.getById = (id, callback) => {
  db.query("SELECT * FROM produtos WHERE id=?", [id], callback);
};

exports.create = (produto, callback) => {
  const sql = `
       INSERT INTO produtos
       (nome,descricao,categoria,preco,quantidade,imagem)
       VALUES (?,?,?,?,?,?)
   `;

  db.query(
    sql,
    [
      produto.nome,
      produto.descricao,
      produto.categoria,
      produto.preco,
      produto.quantidade,
      produto.imagem,
    ],
    callback,
  );
};

exports.update = (id, produto, callback) => {
  const sql = `
       UPDATE produtos
       SET nome=?,
           descricao=?,
           categoria=?,
           preco=?,
           quantidade=?,
           imagem=?
       WHERE id=?
   `;

  db.query(
    sql,
    [
      produto.nome,
      produto.descricao,
      produto.categoria,
      produto.preco,
      produto.quantidade,
      produto.imagem,
      id,
    ],
    callback,
  );
};

exports.delete = (id, callback) => {
  db.query("DELETE FROM produtos WHERE id=?", [id], callback);
};
