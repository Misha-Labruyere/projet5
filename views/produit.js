const produit = document.getElementById("page_produit");
const str = window.location;
const url = new URL(str);

function promiseGet() {
  return new Promise((resolve, reject) => {
    let recupHttp = new XMLHttpRequest();
    const idSelectedProduct = localStorage.getItem("selectedProduct");
    recupHttp.open(
      "GET",
      "http://localhost:3000/api/cameras/" + idSelectedProduct
    );
    recupHttp.send();
    recupHttp.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE) {
        if (this.status == 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject(recupHttp);
        }
      }
    };
  });
}

function insertImageCamera(imageUrl) {
  const photoCamera = document.getElementById("photo_camera");
  photoCamera.src = imageUrl;
}

function insertName(name) {
  const nameCamera = document.getElementById("name_camera");
  nameCamera.textContent = name;
}

function insertId(_id) {
  const idCamera = document.getElementById("id_camera");
  idCamera.textContent = _id;
}

function insertLentille(lenses) {
  const selectionLentille = document.getElementById("lentille_camera");
  const lensesSelectElement = document.getElementById("lenses");

  for (let i = 0; i < lenses.length; i++) {
    const lensesOptionElement = document.createElement("option");
    lensesOptionElement.value = lenses[i];
    lensesOptionElement.textContent = lenses[i];
    lensesSelectElement.appendChild(lensesOptionElement);
  }
}

function insertPrix(price) {
  const prixCamera = document.getElementById("prix_camera");
  prixCamera.textContent = price;
}

function insertDescription(description) {
  const descriptionCamera = document.getElementById("description_camera");
  descriptionCamera.textContent = description;
}

function insertBoutonAjoutPanier(id) {
  const boutonAjoutPanier = document.getElementById("ajout_panier");
  boutonAjoutPanier.addEventListener("click", function (e) {
    //Récuperer la valeur stockée en localstorage (tableau), dans le tableau on push la valeur de notre objet choisi (id + choice) et enfin on insert le tableau en localstorage
    //   stocker les informations de la camera selectionnee dans le local storage dans un tableau
    let selectChoice = document.getElementById("lenses");
    let choiceLense = selectChoice.options[selectChoice.selectedIndex].value;
    let choice = { idProduct: id, choiceProduct: choiceLense };
    const selectedCameras =
      JSON.parse(localStorage.getItem("selectedCameras")) || [];
    console.log(selectedCameras);
    selectedCameras.push(choice);
    localStorage.setItem("selectedCameras", JSON.stringify(selectedCameras));

    console.log(choiceLense);
  });
}

promiseGet()
  .then(function (response) {
    const pageProduct = document.getElementById("page_produit");
    const infoCamera = document.getElementById("info_camera");
    insertImageCamera(response.imageUrl);
    insertName(response.name);
    insertId(response._id);
    insertPrix(response.price);
    insertDescription(response.description);

    insertLentille(response.lenses);
    const selectionLentille = document.getElementsByName("select");
    // selectionLentille.addEventListener("change", function (e) {});

    insertBoutonAjoutPanier(response._id);
  })
  .catch(function (error) {
    console.log(error);
  });
