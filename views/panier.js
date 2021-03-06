const infoPanier = document.getElementById("info_panier");
const infoCamera = localStorage.getItem("selectedCameras");
const infoCameras = JSON.parse(infoCamera);

for (const [index, camera] of infoCameras.entries()) {
  const recupId = camera.idProduct;

  let productInHtml = document.getElementById("product_" + recupId)
    console.log(productInHtml);

  if (productInHtml) {
    let count = Number(
      document.getElementsByClassName("product_count")[0].innerHTML)
    count = count + 1;
    console.log(productInHtml);

    productInHtml.getElementsByClassName('product_count')[0].innerHTML = count;
  } else {
    fetch("http://localhost:3000/api/cameras/" + recupId)
      .then((product) => product.json())

      .then((product) => {
        let detailProduct = `<div class="info_panier" id="product_${recupId}">
  <img class="photo" src="${product.imageUrl}">
  <div class="name">${product.name}</div>  
  <div class="lens">${camera.choiceProduct}</div>
  <div class="price">${product.price}</div>
  <div class="product_count">1</div>
  <div class="description">${product.description}</div>
  <button onclick="delete_product(${index})" class="suppression_article">Supprimer du panier</button>
  </div>`;
        const productPanier = document.getElementById("selection_panier");
        productPanier.innerHTML += detailProduct;
      })

      .catch((error) => alert("Erreur : " + error));
  }
}

function delete_product(id) {
  let panier = JSON.parse(localStorage.getItem("selectedCameras"));
  window.location.reload();
  //supprimer le produit dans le tableau

  let newPanier = [];

  for (const [index, produit] of panier.entries()) {
    console.log(index, produit);
    console.log(id, produit.idProduct);
    if (id !== index) {
      newPanier.push(produit);
    }
  }

  localStorage.setItem("selectedCameras", JSON.stringify(newPanier));
}


(function() {
  let httpRequest = document.getElementById("envoyerReponse").addEventListener('click', makeRequest);
  
  function makeRequest() {
    httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = alertContents;
    httpRequest.open("POST", "http://localhost:3000/api/cameras");
    httpRequest.send();
  }

  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        alert(httpRequest.responseText);
      } else {
        alert('Il y a eu un problème avec la requête.');
      }
    }
  }
})();
