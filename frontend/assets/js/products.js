const API = "http://localhost:3000/api/products";

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

// LISTAR PRODUTOS CLIENTE

async function loadProducts() {
  const response = await fetch(API);

  const products = await response.json();

  const container = document.getElementById("productsContainer");

  if (!container) return;

  container.innerHTML = "";

  products.forEach((product) => {
    container.innerHTML += `

       <div class="product-card">

           <img src="${product.imagem}">

           <div class="product-info">

               <h3 class="product-title">
                   ${product.nome}
               </h3>

               <p class="product-price">
                   R$ ${product.preco}
               </p>

               <button class="buy-btn">
                   Comprar
               </button>

           </div>

       </div>

       `;
  });
}

// LISTAR PRODUTOS ADMIN

async function loadAdminProducts() {
  const response = await fetch(API);

  const products = await response.json();

  const table = document.getElementById("productsTable");

  if (!table) return;

  table.innerHTML = "";

  products.forEach((product) => {
    table.innerHTML += `

       <tr>

           <td>${product.id}</td>

           <td>
               <img src="${product.imagem}">
           </td>

           <td>${product.nome}</td>

           <td>${product.categoria}</td>

           <td>R$ ${product.preco}</td>

           <td>

               <button
                   class="edit-btn"
                   onclick="editProduct(${product.id})">

                   Editar

               </button>

               <button
                   class="delete-btn"
                   onclick="deleteProduct(${product.id})">

                   Excluir

               </button>

           </td>

       </tr>

       `;
  });
}

// CADASTRAR / EDITAR

async function saveProduct() {
  const produto = {
    nome: document.getElementById("nome").value,

    descricao: document.getElementById("descricao").value,

    categoria: document.getElementById("categoria").value,

    preco: document.getElementById("preco").value,

    quantidade: document.getElementById("quantidade").value,

    imagem: document.getElementById("imagem").value,
  };

  let url = API;
  let method = "POST";

  if (productId) {
    url = `${API}/${productId}`;
    method = "PUT";
  }

  const response = await fetch(url, {
    method,

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(produto),
  });

  const data = await response.json();

  alert(data.message);

  window.location.href = "admin-products.html";
}

// CARREGAR PRODUTO PARA EDIÇÃO

async function loadProduct() {
  if (!productId) return;

  const response = await fetch(`${API}/${productId}`);

  const product = await response.json();

  document.getElementById("nome").value = product.nome;

  document.getElementById("descricao").value = product.descricao;

  document.getElementById("categoria").value = product.categoria;

  document.getElementById("preco").value = product.preco;

  document.getElementById("quantidade").value = product.quantidade;

  document.getElementById("imagem").value = product.imagem;
}

// EDITAR

function editProduct(id) {
  window.location.href = `product-form.html?id=${id}`;
}

// EXCLUIR

async function deleteProduct(id) {
  const confirmDelete = confirm("Deseja excluir o produto?");

  if (!confirmDelete) return;

  const response = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  alert(data.message);

  loadAdminProducts();
}

// AUTOLOAD

loadProducts();

loadAdminProducts();

loadProduct();
