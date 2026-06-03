const token = localStorage.getItem("token");

async function register() {
  const nomeCompleto = document.getElementById("nomeCompleto").value;
  const nomeUsuario = document.getElementById("nomeUsuario").value;
  const email = document.getElementById("email").value;
  const cpf = document.getElementById("cpf").value;
  const senha = document.getElementById("senha").value;
  const role = document.getElementById("role").value;
  const res = await fetch("http://localhost:3000/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nomeCompleto,
      nomeUsuario,
      email,
      cpf,
      senha,
      role,
    }),
  });
  const data = await res.json();
  alert(data.message);
}

async function loadProfile() {
  const res = await fetch("http://localhost:3000/api/users/profile", {
    headers: { authorization: token },
  });
  const user = await res.json();
  document.getElementById("nomeCompleto").value = user.nomeCompleto;
  document.getElementById("nomeUsuario").value = user.nomeUsuario;
  document.getElementById("email").value = user.email;
  document.getElementById("cpf").value = user.cpf;
  document.getElementById("senha").value = user.senha;
  document.getElementById("role").value = user.role;
}

async function updateUser() {
  const nomeCompleto = document.getElementById("nomeCompleto").value;
  const nomeUsuario = document.getElementById("nomeUsuario").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const cpf = document.getElementById("cpf").value;
  const role = document.getElementById("role").value;
  const res = await fetch("http://localhost:3000/api/users/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({
      nomeCompleto,
      nomeUsuario,
      email,
      senha,
      cpf,
      role,
    }),
  });
  const data = await res.json();
  alert(data.message);
}

async function deleteUser() {
  const res = await fetch("http://localhost:3000/api/users/delete", {
    method: "DELETE",
    headers: { authorization: token },
  });
  const data = await res.json();
  alert(data.message);
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

loadProfile();
