// Sélection des éléments avec les classes "tab-links" et "tab-contents"
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

// Fonction pour ouvrir un onglet spécifié
function opentab(tabname) {
  // Suppression de la classe "active-link" de tous les éléments avec la classe "tab-links"
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }

  // Suppression de la classe "active-tab" de tous les éléments avec la classe "tab-contents"
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }

  // Ajout de la classe "active-link" à l'élément actuel (cible de l'événement)
  event.currentTarget.classList.add("active-link");

  // Ajout de la classe "active-tab" à l'élément avec l'ID correspondant au nom de l'onglet
  document.getElementById(tabname).classList.add("active-tab");
}

// Sélection des éléments nécessaires pour le carrousel
const carousel = document.querySelector(".carousel"),
  firstImg = carousel.querySelectorAll("img")[0],
  arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;

// Fonction pour afficher/masquer les icônes de navigation en fonction de la position du carrousel
const showHideIcons = () => {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
};

// Gestion des clics sur les icônes de navigation (gauche/droite)
arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14;
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60);
  });
});

// Fonction pour effectuer un défilement automatique après un certain temps
const autoSlide = () => {
  if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

  positionDiff = Math.abs(positionDiff);
  let firstImgWidth = firstImg.clientWidth + 14;
  let valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    return (carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }

  carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

// Gestion du début du glissement (souris enfoncée/touche tactile)
const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

// Gestion du glissement (souris déplacée/touche tactile déplacée)
const dragging = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

// Gestion de la fin du glissement (souris relâchée/touche tactile levée)
const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");

  if (!isDragging) return;
  isDragging = false;
  autoSlide();
};

// Écouteurs d'événements pour la gestion du glissement sur le carrousel
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);
