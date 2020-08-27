const infoPanier = document.getElementById("info_panier");
const infoCamera = localStorage.getItem("selectedCameras");
const infoCameras = JSON.parse(infoCamera);
console.log(infoCamera);

for(const camera of infoCameras) {

  const recupId = camera.idProduct;

  fetch("http://localhost:3000/api/cameras/" + recupId)

    .then((product) => product.json())

    .then((product) => 

  let detailProduct = `<div class="info_panier">
  <img class="photo" src="">
  <div class="id">${product.id}</div>
  <div class="name">${product.name}</div>
  <div class="price">${product.price}</div>
  <div class="description">${product.description}</div>
  </div>`

  const productPanier = document.getElementById("selection_panier")
  productPanier.innerHTML = detailProduct
    )
    
    .catch((error) => alert("Erreur : " + error));
  console.log(camera);
}