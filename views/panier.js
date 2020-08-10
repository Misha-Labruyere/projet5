const infoPanier = document.getElementById("info_panier");
const infoCamera = localStorage.getItem("selectedCameras");
const infoCameras = JSON.parse(infoCamera);
console.log(infoCamera);

const Handlebars = require("handlebars");
const template = Handlebars.compile("Name: {{name}}");
console.log(template({ name: "Nils" }));

function recupCamera {

}

function recupName() {
  const nameCamera = document.getElementById("name");
  nameCamera.textContent = infoCameras.name;
}

function recupId() {
  const idCamera = document.getElementById("id");
  idCamera.textContent = infoCameras._id;
}

function recupPhoto() {
  const photoCamera = document.getElementById("photo");
  photoCamera.src = infoCameras.imageUrl;
}

function recupPrice() {
  const priceCamera = document.getElementById("price");
  priceCamera.textContent = infoCameras.price;
}

function recupDescription() {
  const descriptionCamera = document.getElementById("description");
  descriptionCamera.textContent = infoCameras.description;
}

function validationCommande() {
  const boutonValidationPanier = document.getElementById("validation_panier");
  boutonValidationPanier.addEventListener("click", function (e) {
    //   envoyer les informations du panier au server
  });
}

const recupInfos = document.getElementById("info_panier");
for (let i = 0; i < infoCameras.length; i++) {
  recupName();
  recupId();
  recupPhoto();
  recupPrice();
  recupDescription();
}
