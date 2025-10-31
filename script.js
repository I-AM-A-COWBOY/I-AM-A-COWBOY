
// --- Particles.js ---
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 100 },
    "color": { "value": "#ffffff" },
    "shape": { "type": "circle" },
    "opacity": { "value": 0.5 },
    "size": { "value": 3 },
    "move": { "enable": true, "speed": 2 }
  }
});

// --- Variables ---
const searchBar = document.getElementById('searchBar');
const imageCards = document.querySelectorAll('.image-card');
const sortRarity = document.getElementById('sortRarity');
const sortPriceAsc = document.getElementById('sortPriceAsc');
const sortPriceDesc = document.getElementById('sortPriceDesc');

// Popup
const popup = document.getElementById('popup');
const popupClose = document.getElementById('popupClose');
const popupImage = document.getElementById('popupImage');
const popupTitle = document.getElementById('popupTitle');
const popupRarity = document.getElementById('popupRarity');
const priceText = document.getElementById('priceText');
const popupBonus = document.getElementById('popupBonus');

// Couleurs selon rareté
const rarityColors = {
  'Commun': 'green',        // 💚 vert
  'UnCommun': 'purple',     // 💜 violet
  'Rare': 'blue',           // 💙 bleu
  'Legendaire': 'gold',     // 💛 or
  'Mythique': 'hotpink',    // 💖 rose
  'Secret': 'grey'          // 🩶 gris
};

// --- Recherche ---
searchBar.addEventListener('input', () => {
  const filter = searchBar.value.toLowerCase();
  imageCards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    card.style.display = title.includes(filter) ? 'inline-block' : 'none';
  });
});

// --- Tri ---
function sortCards(compareFn) {
  const container = document.querySelector('.images-container');
  Array.from(imageCards)
       .sort(compareFn)
       .forEach(card => container.appendChild(card));
}

// Trier par rareté
sortRarity.addEventListener('click', () => {
  const rarityOrder = ['Commun', 'UnCommun', 'Rare', 'Legendaire', 'Mythique', 'Secret'];
  sortCards((a, b) => rarityOrder.indexOf(a.dataset.rarity) - rarityOrder.indexOf(b.dataset.rarity));
});

// Trier par prix croissant
sortPriceAsc.addEventListener('click', () => {
  sortCards((a, b) => parseInt(a.dataset.price) - parseInt(b.dataset.price));
});

// Trier par prix décroissant
sortPriceDesc.addEventListener('click', () => {
  sortCards((a, b) => parseInt(b.dataset.price) - parseInt(a.dataset.price));
});

// --- Lueur permanente ---
imageCards.forEach(card => {
  const rarity = card.dataset.rarity;
  const color = rarityColors[rarity] || 'white';
  card.style.boxShadow = `0 0 20px 5px ${color}`;
  card.style.transition = 'transform 0.3s';
  
  card.addEventListener('mouseover', () => {
    card.style.transform = 'scale(1.05)';
  });
  card.addEventListener('mouseout', () => {
    card.style.transform = 'scale(1)';
  });
});

// --- Popup ---
imageCards.forEach(card => {
  card.addEventListener('click', () => {
    popup.style.display = 'block';
    popupImage.src = card.dataset.img;
    popupTitle.textContent = card.dataset.title;

    const rarity = card.dataset.rarity;
    popupRarity.textContent = 'Rareté: ' + rarity;
    popupRarity.style.color = rarityColors[rarity] || 'black';

    priceText.textContent = 'Prix: ' + card.dataset.price + ' 💰';
    priceText.style.color = '#00FF7F';

    popupBonus.textContent = 'Bonus: ' + card.dataset.bonus;
    popupBonus.style.color = '#FFFF00';
  });
});

// Fermer popup
popupClose.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Fermer popup en cliquant en dehors
window.addEventListener('click', e => {
  if(e.target === popup) popup.style.display = 'none';
});
