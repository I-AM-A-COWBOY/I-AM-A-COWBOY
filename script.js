// ========================================
// PARTICLES.JS CONFIGURATION
// ========================================
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

// ========================================
// VARIABLES
// ========================================
const searchBar = document.getElementById('searchBar');
const imageCards = document.querySelectorAll('.image-card');
const sortRarity = document.getElementById('sortRarity');
const sortPriceAsc = document.getElementById('sortPriceAsc');
const sortPriceDesc = document.getElementById('sortPriceDesc');
const popup = document.getElementById('popup');
const popupOverlay = document.getElementById('popupOverlay');
const popupClose = document.getElementById('popupClose');
const popupImage = document.getElementById('popupImage');
const popupTitle = document.getElementById('popupTitle');
const popupRarity = document.getElementById('popupRarity');
const priceText = document.getElementById('priceText');
const popupBonus = document.getElementById('popupBonus');

// ========================================
// COULEURS PAR RARETÉ
// ========================================
const rarityColors = {
  'Commun': 'green',
  'UnCommun': 'purple',
  'Rare': 'blue',
  'Legendaire': 'gold',
  'Mythique': 'hotpink',
  'Secret': 'grey'
};

// ========================================
// RECHERCHE
// ========================================
searchBar.addEventListener('input', () => {
  const filter = searchBar.value.toLowerCase();
  imageCards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    card.style.display = title.includes(filter) ? 'inline-block' : 'none';
  });
});

// ========================================
// FONCTION DE TRI
// ========================================
function sortCards(compareFn) {
  const container = document.querySelector('.images-container');
  Array.from(imageCards)
       .sort(compareFn)
       .forEach(card => container.appendChild(card));
}

// ========================================
// TRIER PAR RARETÉ (SECRET → MYTHIQUE → LEGENDAIRE → RARE → UNCOMMUN → COMMUN)
// ========================================
sortRarity.addEventListener('click', () => {
  const rarityOrder = ['Secret', 'Mythique', 'Legendaire', 'Rare', 'UnCommun', 'Commun'];
  sortCards((a, b) => rarityOrder.indexOf(a.dataset.rarity) - rarityOrder.indexOf(b.dataset.rarity));
});

// ========================================
// TRIER PAR PRIX CROISSANT
// ========================================
sortPriceAsc.addEventListener('click', () => {
  sortCards((a, b) => parseInt(a.dataset.price) - parseInt(b.dataset.price));
});

// ========================================
// TRIER PAR PRIX DÉCROISSANT
// ========================================
sortPriceDesc.addEventListener('click', () => {
  sortCards((a, b) => parseInt(b.dataset.price) - parseInt(a.dataset.price));
});

// ========================================
// LUEUR PERMANENTE
// ========================================
imageCards.forEach(card => {
  const rarity = card.dataset.rarity;
  const color = rarityColors[rarity] || 'white';
  card.style.boxShadow = `0 0 20px 5px ${color}`;
  card.style.transition = 'transform 0.3s, box-shadow 0.3s';
  
  card.addEventListener('mouseover', () => {
    card.style.transform = 'scale(1.05)';
  });
  card.addEventListener('mouseout', () => {
    card.style.transform = 'scale(1)';
  });
});

// ========================================
// POPUP
// ========================================
imageCards.forEach(card => {
  card.addEventListener('click', () => {
    popup.classList.add('show');
    popup.style.display = 'block';
    popupOverlay.classList.add('show');
    
    popupImage.src = card.dataset.img;
    popupTitle.textContent = card.dataset.title;
    
    const rarity = card.dataset.rarity;
    popupRarity.textContent = 'Rareté: ' + rarity;
    popupRarity.style.color = rarityColors[rarity] || 'black';
    
    priceText.textContent = 'Prix: ' + card.dataset.price + ' 💰';
    priceText.style.color = '#00FF7F';
    
    popupBonus.textContent = 'Bonus: ' + card.dataset.bonus;
    popupBonus.style.color = '#FFFF00';
    
    // Bloquer le scroll
    document.body.style.overflow = 'hidden';
  });
});

// ========================================
// FERMER POPUP
// ========================================
function closePopup() {
  popup.classList.remove('show');
  popup.style.display = 'none';
  popupOverlay.classList.remove('show');
  document.body.style.overflow = 'auto';
}

popupClose.addEventListener('click', closePopup);

// Fermer avec overlay
popupOverlay.addEventListener('click', closePopup);

// Empêcher la fermeture en cliquant sur le popup lui-même
popup.addEventListener('click', (e) => {
  e.stopPropagation();
});

// Fermer avec Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && popup.classList.contains('show')) {
    closePopup();
  }
});

// ========================================
// LOGS
// ========================================
console.log('🔥 I AM A COWBOY - Website loaded!');
console.log('Total cards:', imageCards.length);
