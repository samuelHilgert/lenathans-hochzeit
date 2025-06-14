let photos = [
    './img/gallery/0.jpg',
    './img/gallery/1.jpg',
    './img/gallery/2.jpg',
    './img/gallery/3.jpg',
    './img/gallery/4.jpg',
    './img/gallery/5.jpg',
    './img/gallery/6.jpg',
    './img/gallery/7.jpg'
    // './img/gallery/8.jpg',
    // './img/gallery/9.jpg',
    // './img/gallery/10.jpg'
];

let altText = [
    'schwarzweiß Bäume',
    'Strand Meer Selfie Sonnenuntergang',
    'Fahrrad Fahrräder Burg Ruine',
    'Holland Amsterdam Fluss Hafen Hafenstadt',
    'blaues Gebäude Regenschirm Jonathan vor dem Gebäude Haus blaue Tür',
    'Gesichter Bäume Wald lachen Umarmung im Arm',
    'Lena Magdalena Tunnel von hinten',
    'Standesamt Feier Seifenblasen Girlande Blumen Leute'
];

// Speichern im LocalStorage 
var clicked = localStorage.getItem('clicked') === 'false'; // Konvertiere zu einem booleschen Wert
localStorage.setItem('clicked', false);



// Startseite wird gerendert
function render() {
    let photoContainer = document.getElementById('photoContainer');
    photoContainer.innerHTML = ``;
    createGallery();
}

// render() ruft diese Funktion auf, um Fotos dynamisch mit HTML zu erstellen
function createGallery() {
    for (let i = 0; i < photos.length; i++) {
        const photosArray = photos[i];
        const altArray = altText[i];
        photoContainer.innerHTML += `  
        <img class="photo-style img" src="${photosArray}" id="${i}" alt="${altArray}" onclick="showPhoto(${i})">
    `;
    }
}

// Verändert das Design der Seite in schwarz/weiß
function blackDesign() {
    let photoContainer = document.getElementById('content');
    let changeDesignColor = document.getElementById('changeDesign');
    let changeTitleText = document.getElementById('titleText');
    changeDesign(photoContainer, changeDesignColor, changeTitleText);
}

function changeDesign(photoContainer, changeDesignColor, changeTitleText) {
    var clicked = localStorage.getItem('clicked');
    photoContainer.classList.add('d-none');
    changeDesignColor.classList.add('change-design-color');
    changeTitleText.classList.add('title-text');
    if (clicked === 'false') {
        photoContainer.style.backgroundColor = 'black';
        changeDesignColor.style.color = 'white';
        changeTitleText.style.color = 'white';
        localStorage.setItem('clicked', true);
    }
    if (clicked === 'true') {
        photoContainer.style.backgroundColor = 'white';
        changeDesignColor.style.color = 'black';
        changeTitleText.style.color = 'black';
        localStorage.setItem('clicked', false);
    }
}

// Funktion berechnet die gewünschte Breite für jedes Bild in der Reihe.
function adjustImageWidth() {
    var photoBoxes = document.querySelectorAll('.photo-box');
    var containerWidth = document.querySelector('.photo-container').offsetWidth; // Die Breite des Inhaltsbereichs plus Padding und Border, aber ohne Margin. Es schließt auch die Breite von vertikalen Scrollbalken (falls vorhanden) ein.
    var numberOfPhotos = photoBoxes.length; // Anzahl Bilder insgesamt
    var desiredWidth = containerWidth / numberOfPhotos;
    photoBoxes.forEach(function (box) { // führt eine Schleife durch alle Elemente mit der Klasse .photo-box durch
        box.style.width = desiredWidth + 'px'; //setzt die Breite jedes Elements auf die zuvor berechnete desiredWidth.
    });
}

// Zeigt das ausgewählte Bild in Groß und verändert den Hintergrund
function showPhoto(clickedPhoto) {
    let photoID = photos[clickedPhoto];
    renderImgBox(photoID, clickedPhoto);
}

function renderImgBox(photoID, clickedPhoto) {
    let photoContainer = document.getElementById('content');
    photoContainer.innerHTML = `
    <div class="show-img-box">
    <a onclick="goBackHome()"><span class="show-img-box-arrow bg-icon-circle">&#10132;</span></a>
    <div class="show-main-arrows" id="showMainArrows">
    <a class="bg-icon-circle" onclick="lastImg(${clickedPhoto})">&#x276E;</a>
    <a class="bg-icon-circle" onclick="nextImg(${clickedPhoto})">&#x276F;</a>
    </div>
    <img src="${photoID}" id="photoId${clickedPhoto}" onmouseover="hoverImgBox(this)" onmouseout="resetImgBox(this)"></img>
    </div>
    `;
}

// Wenn über das Foto gehovered wird
function hoverImgBox(element) {
    let showMainArrows = document.getElementById('showMainArrows');
    showMainArrows.style.visibility = 'hidden'; // Wenn das Bild gehovered wird, wird showMainArrows ausgeblendet
}

// Wenn aus einem Foto heraus gehovered wird
function resetImgBox(element) {
    let showMainArrows = document.getElementById('showMainArrows');
    showMainArrows.style.visibility = 'visible'; // Wenn das Bild verlassen wird, wird showMainArrows eingeblendet
}

// Durchklicken durch die Bilder im Großformat (zurück)
function lastImg(clickedPhoto) {
    let currentPhotoId = clickedPhoto;
    if (currentPhotoId == 0) {
        currentPhotoId = photos.length - 1;
        showPhoto(currentPhotoId);
        console.log('photoID = ' + currentPhotoId);
    }
    else {
        currentPhotoId--;
        showPhoto(currentPhotoId)
        console.log('photoID = ' + currentPhotoId);
    }
}

// Durchklicken durch die Bilder im Großformat (vor)
function nextImg(clickedPhoto) {
    let currentPhotoId = clickedPhoto;
    if (currentPhotoId == photos.length - 1) {
        currentPhotoId = 0;
        showPhoto(currentPhotoId);
        console.log('photoID = ' + currentPhotoId);
    }
    else {
        currentPhotoId++;
        showPhoto(currentPhotoId)
        console.log('photoID = ' + currentPhotoId);
    }
}

// Prüft, ob zuvor das Design auf schwarz gestellt wurde, damit das Design beibehalten wird
function goBackHome() {
    var clicked = localStorage.getItem('clicked');
    if (clicked === 'true') {
        window.location.href = './galerie.html?blackDesignActive=' + clicked; // Der Parameter wird über die Adresse mitgegeben
    } else {
        window.location.href = './galerie.html';
    }
}

// Funktion, um den Wert von clicked aus der URL zu lesen und im Local Storage zu speichern
function checkURLParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    const blackDesignActive = urlParams.get('blackDesignActive');
    if (blackDesignActive === 'true') {
        localStorage.setItem('clicked', false);
        blackDesign();
    } else {
        localStorage.setItem('clicked', true);
        blackDesign();
    }
}

// Funktionen, um mithilfe der Suchleiste nach einem Foto zu suchen

// Funktion für die Enter Abfrage wird initialisiert
function getSearchWordByEnter() {
    let searchInput = document.getElementById('searchInput');
    searchInput.addEventListener("keydown", function (event) {
        handleEnterKeyInSearch(event, searchInput.value);
    });
}

// Wert der Enter-Abfrage wird der Funktion searchPhoto übergeben
function handleEnterKeyInSearch(event, searchInputValue) {
    if (event.key === "Enter") {
        searchWord = searchInputValue;
        givePhoto(searchWord);
    }
}

function searchPhoto() {
    let searchInput = document.getElementById('searchInput').value.trim(); // Den Wert des Suchfelds abrufen und führende und nachfolgende Leerzeichen entfernen
    if (searchInput) { // Überprüfen, ob das Suchfeld nicht leer ist
        let searchWord = searchInput;
        givePhoto(searchWord);
    }
}

function givePhoto(searchWord) {
    let photoContainer = document.getElementById('photoContainer'); // Container für die Fotos
    let editedSearchWord = searchWord.toLowerCase().trim(); // Wert in Kleinbuchstaben umwandeln und führende und nachfolgende Leerzeichen entfernen
    let searchPhotoId = null; // Variable zur Speicherung der ID des gefundenen Bilds

    if (photoContainer) { // Prüfen, ob der Container existiert
        let allPhotos = photoContainer.querySelectorAll('.photo-style'); // Alle Foto-Elemente innerhalb des Containers abrufen

        // Durch alle Fotos iterieren und nach Übereinstimmungen suchen
        allPhotos.forEach(photo => {
            let img = photo; // Das Foto-Element selbst ist das <img> -Tag
            let src = img.getAttribute('src').toLowerCase().trim(); // Quellattribut des Bildes in Kleinbuchstaben umwandeln und führende und nachfolgende Leerzeichen entfernen
            let alt = img.getAttribute('alt').toLowerCase().trim(); // Alt-Attribut des Bildes in Kleinbuchstaben umwandeln und führende und nachfolgende Leerzeichen entfernen

            // Überprüfen, ob die Eingabe des Benutzers im Alt-Text oder im Bildquellen-Attribut des Bildes vorhanden ist
            if (alt.includes(editedSearchWord) || src.includes(editedSearchWord)) {
                searchPhotoId = img.id; // ID des gefundenen Bilds speichern
                showPhoto(searchPhotoId);
                return; // Wenn ein Bild gefunden wurde, die Schleife beenden
            }
        });
    }
}

function deleteInputSearch() {
    document.getElementById('searchInput').value = ``;
}

function forwardToDownloads() {
    window.open('download.html', '_blank');
}

function fetchImages() {
    fetch('../templates/listImages.php')
        .then(response => response.json())
        .then(images => {
            const container = document.getElementById('imagesContainer');
            container.innerHTML = ''; // Clear existing images
            images.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = image;
                imgElement.style.width = '100px';
                imgElement.style.margin = '10px';
                imgElement.style.cursor = 'pointer';
                imgElement.onclick = () => downloadImage(image);
                container.appendChild(imgElement);
            });
        })
        .catch(error => console.error('Error fetching images:', error));
}

function downloadImage(imageUrl) {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Hiermit wird automatisch beim Laden der Seite der Fokus auf die Eingabe im Suchfeld gelegt.
document.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.focus();
    } else {
        console.error("Das Suchfeld wurde nicht gefunden.");
    }
});