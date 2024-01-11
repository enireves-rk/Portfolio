//Script pour changer la catégorie d'images
function changeCategory(category, numImages) {
    var imagesContainer = document.getElementById('images-container');

    // Vérifie si l'élément existe
    if (imagesContainer) {
        // Efface les images existantes
        imagesContainer.innerHTML = '';

        // Définit le nombre de colonnes et d'images par colonne
        var columns = 2;
        var imagesPerColumn = [2, 3];
        if (numImages == 6) {
            imagesPerColumn = [3, 3];
        }

        var totalImages = imagesPerColumn.reduce((a, b) => a + b, 0); // Nombre total d'images

        for (var i = 0; i < columns; i++) {
            var column = document.createElement('div');
            column.className = 'column';

            // Calcule l'index de départ pour la colonne actuelle
            var startIndex = Math.floor(i * totalImages / columns);

            for (var j = 1; j <= imagesPerColumn[i]; j++) {
                var img = document.createElement('img');
                img.src = 'Images/' + category + '/' + (startIndex + j) + '.jpg';
                column.appendChild(img);
                console.log('image ' + j);
            }

            imagesContainer.appendChild(column);
        }
    } else {
        console.error("Element with id 'images-container' not found.");
    }
}

// Récupère les paramètres d'URL pour la catégorie et le nombre d'images
var urlParams = new URLSearchParams(window.location.search);
var category = urlParams.get('category');
var numImages = urlParams.get('numImages');
console.log(numImages)

// Si une catégorie est spécifiée, change la catégorie d'images
if (category) {
    changeCategory(category, numImages);
}
