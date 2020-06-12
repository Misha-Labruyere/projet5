const catalogue = document.getElementById('catalogue');

function insertImageCamera(section, imageCameras) {
    const newFigure = document.createElement('figure');
    section.appendChild(newFigure);
    const newImage = document.createElement('img');
    newFigure.appendChild(newImage);
    newImage.setAttribute('src', imageCameras);
}

function insertName(div1, insertName) {
    const newH3 = document.createElement('h3');
    div1.appendChild(newH3);
    newH3.innerHTML = insertName;
}

function insertId(div2, idCameras) {
    const Div2 = document.createElement('div');
    div2.appendChild(Div2);
    div2.className = 'id_camera';
    const newP1 = document.createElement('p');
    div2.appendChild(newP1);
    newP1.innerHTML = "Numéro d'Id : ";
    const newP2 = document.createElement('p');
    div2.appendChild(newP2);
    newP2.id = 'id_camera';
    newP2.innerHTML = idCameras;

}

function insertLentille(div3) {
    const newP3 = document.createElement('p');
    div3.appendChild(newP3);
    newP3.innerHTML = "Lentille : Personnalisable";
}

function insertDescription(div4, descriptionCameras) {
    const newP4 = document.createElement('p');
    div4.appendChild(newP4);
    newP4.innerHTML = descriptionCameras;
}

function insertPrix(div5, priceCameras) {
    const Div5 = document.createElement('div');
    div5.appendChild(Div5);
    Div5.className = 'prix_camera';
    const newP5 = document.createElement('p');
    Div5.appendChild(newP5);
    newP5.innerHTML = priceCameras;
}

function insertLienPersonnalisation(div6, idLienCameras) {
    const Div6 = document.createElement('div');
    div6.appendChild(Div6);
    Div6.className = 'ajout_panier';
    const newP6 = document.createElement('p');
    Div6.appendChild(newP6);
    const A = document.createElement('a');
    newP6.appendChild(A);
    A.className = 'lien_page_produit';
    A.setAttribute('href', './produit.html?id=' + idLienCameras);
    A.innerHTML = 'Choisissez votre lentille';
}

function showErrorMessage() {
    const H1 = document.getElementById('titre-principal');
    H1.style.display = 'none';
    const H2 = document.getElementById('titre-secondaire');
    H2.style.display = 'none';
    const Footer = document.getElementById('footer');
    Footer.style.display = 'none';
    const divServerOut = document.createElement('div');
    catalogue.appendChild(divServerOut);
    divServerOut.id = 'div_server_out';
    divServerOut.innerHTML = 'Nous revenons très bientôt';
}

function promiseGet() {
    return new Promise((resolve, reject) => {
        let recupHttp = new XMLHttpRequest();
        recupHttp.open('GET', 'http://localhost:3000/api/cameras');
        recupHttp.send();
        recupHttp.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE) {
                if (this.status == 200) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject(recupHttp);
                }
            }
        }
    })
}

promiseGet()
    .then(function (response) {
        for (let i = 0; i < response.length; i++) {
            const Section = document.createElement('section');
            catalogue.appendChild(Section);
            Section.className = 'PartieCamera';
            insertImageCamera(Section, response[i].imageUrl);
            const newDiv = document.createElement('div');
            Section.appendChild(newDiv);
            insertName(newDiv, response[i].name);
            insertId(newDiv, response[i]._id);
            insertLentille(newDiv);
            insertDescription(newDiv, response[i].description);
            const newDiv2 = document.createElement('div');
            Section.appendChild(newDiv2);
            newDiv2.className = 'tarifs';
            insertPrix(newDiv2, response[i].price + ' ' + '€');
            insertLienPersonnalisation(newDiv2, response[i]._id);
        }
    })
    .catch(function (error) {
        showErrorMessage();
    })