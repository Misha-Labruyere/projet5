const str = window.location;
const url = new URL(str);
const idUrl = url.searchParams.get("id");

function promiseGet() {
    return new Promise((resolve, reject) => {
        let recoverHttp = new XMLHttpRequest();
        recoverHttp.open('GET', 'http://localhost:3000/api/cameras/' + idUrl);
        recoverHttp.send();
        recoverHttp.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE) {
                if (this.status == 200) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject(XMLHttpRequest);
                }
            }
        }
    })


}

function insertPicture(section, camera) {
    const newFigure = document.createElement('figure');
    section.appendChild(newFigure);
    const newPic = document.createElement('img');
    newFigure.appendChild(newPic);
    newPic.setAttribute('src', camera.imageUrl);
}
function insertName(description, camera) {
    const nameCamera = document.createElement('h3');
    description.appendChild(nameCamera;
    nameCamera.innerHTML = camera.name;
}
function insertId(description, camera) {
    const divId = document.createElement('div');
    description.appendChild(divId);
    divId.className = 'id_camera';
    const paragraphNumId = document.createElement('p');
    divId.appendChild(paragraphNumId);
    const newSpan = document.createElement('span');
    paragraphNumId.appendChild(newSpan);
    newSpan.innerHTML = "Numéro d'Id : ";
    const paragraphId = document.createElement('p');
    divId.appendChild(paragraphId);
    paragraphId.innerHTML = camera._id;
}
function insertColor(description, cameraColors) {
    const divColor = document.createElement('div');
    description.appendChild(divColor);
    divColor.className = "labelForColor";
    const labelColor = document.createElement('label');
    divColor.appendChild(labelColor);
    labelColor.innerHTML = 'Sélectionnez votre couleur préférée : ';
    const selectColor = document.createElement('select');
    labelColor.appendChild(selectColor);
    selectColor.id = 'choose_color';

    for (let i = 0; i < cameraColors.length; i += 1) {
        const secondOption = document.createElement('option');
        selectColor.appendChild(secondOption);
        secondOption.setAttribute('value', cameraColors[i]);
        secondOption.setAttribute('required', '');
        secondOption.innerHTML = cameraColors[i];
    }
}
function insertDescription(description, camera) {
    const paragraphDescription = document.createElement('p');
    description.appendChild(paragraphDescription);
    paragraphDescription.className = 'divDescript';
    paragraphDescription.innerHTML = camera.description;
}
function insertButtonCart(section, camera) {
    const divRate = document.createElement('div');
    section.appendChild(divRate);
    divRate.className = 'divTarifs';
    const divPrice = document.createElement('div');
    divRate.appendChild(divPrice);
    divPrice.className = 'prixCamera';
    const paragraphPrice = document.createElement('p');
    divPrice.appendChild(paragraphPrice);
    paragraphPrice.innerHTML = camera.price + ' ' + '€';
    const buttonValid = document.createElement('button')
    divRate.appendChild(buttonValid);
    buttonValid.className = 'boutonPanier';
    buttonValid.setAttribute('type', 'submit');
    buttonValid.innerHTML = "Ajouter au Panier";
}

promiseGet()
    .then(function (response) {
        const pageProduct = document.getElementById('page_produit');
        const mainSection = document.createElement('section');
        pageProduct.appendChild(mainSection);
        mainSection.className = 'onlyCamera';
        insertPicture(mainSection, response);
        const cameraDescription = document.createElement('div');
        mainSection.appendChild(cameraDescription);
        cameraDescription.className = 'description_Camera';
        insertName(cameraDescription, response);
        insertId(cameraDescription, response);
        insertColor(cameraDescription, response.colors);
        const chooseColor = document.querySelector('select');
        chooseColor.addEventListener('change', function (e) { //evenement pour voir la couloir choisi
            console.log(chooseColor.value);
        })
        insertDescription(cameraDescription, response);
        insertButtonCart(mainSection, response);


        const addCart = document.querySelector('button');
        addCart.addEventListener('click', function (e) { //evenement 'click' pour l'envoi au local storage
            let cameraChoosen = {
                picture: response.imageUrl,
                firstName: response.name,
                theId: response._id,
                color: chooseColor.value,
                price: response.price,
            }
            const cameraAdded = localStorage.getItem('produuit');
            if (cameraAdded) {
                cameraInCArt = JSON.parse(cameraAdded);
                cameraInCArt.push(cameraChoosen);
                localStorage.setItem('produit', JSON.stringify(cameraInCArt));
                alert('Ajouté au panier !');
            } else {
                cameraInCArt = [];
                cameraInCArt.push(cameraChoosen);
                localStorage.setItem('produit', JSON.stringify(cameraInCArt));
                alert('Ajouté au panier !');
            }
        })
    })
    .catch(function (error) {
        console.log(error);
    })