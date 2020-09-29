const infoPanier = document.getElementById("info_panier");
const infoCamera = localStorage.getItem("selectedCameras");
const infoCameras = JSON.parse(infoCamera);

for (const camera of infoCameras) {
  const recupId = camera.idProduct;

  fetch("http://localhost:3000/api/cameras/" + recupId)
    .then((product) => product.json())

    .then((product) => {
      console.log(product);
      let detailProduct = `<div class="info_panier">
  <img class="photo" src="${product.imageUrl}">
  <div class="id">${product.id}</div>
  <div class="name">${product.name}</div>
  <div class="price">${product.price}</div>
  <div class="description">${product.description}</div>
  <button onclick="delete_product('${product._id}')" class="suppression_article">Supprimer du panier</button>
  </div>`;
      const productPanier = document.getElementById("selection_panier");
      productPanier.innerHTML += detailProduct;
    })

    .catch((error) => alert("Erreur : " + error));
  console.log(camera);
}

function delete_product(id) {
  let panier = JSON.parse(localStorage.getItem("selectedCameras"));
  //supprimer le produit dans le tableau

  let newPanier = [];

  for (const produit of panier) {
    console.log(produit);
console.log(id, produit.idProduct);
    if (id !== produit.idProduct) {
      newPanier.push(produit);
    }
  }

  localStorage.setItem("selectedCameras", JSON.stringify(newPanier));
}


