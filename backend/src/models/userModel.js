const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ifsuldeminas",
  database: "ecommerce",
});

exports.createUser = (user, callback) => {
  const sql = "INSERT INTO users (nomeCompleto, nomeUsuario, email, senha, cpf, role) VALUES (?,?,?,?,?,?)";
  db.query(sql, [user.nomeCompleto,user.nomeUsuario,user.email,user.senha,user.cpf, user.role], callback);
};

exports.update = (email, user, callback) => {
  const sql = "UPDATE usuarios SET nomeCompleto=?, nomeUsuario=?, email=?, senha=?, cpf=?, role=? WHERE email=?";
  db.query(sql, [user.nomeCompleto,user.nomeUsuario, user.email, user.email],user.senha, user.cpf, user.role,  callback);
};

exports.delete = (email, callback) => {
  db.query("DELETE FROM usarios WHERE email=?", [email], callback);
};

exports.findByEmail = (email, callback) => {
  const sql = "SELECT * from usuarios WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) throw err;
    callback(result[0]);
  });
};
