// ========================================
// PARTICLES.JS CONFIGURATION
// ========================================
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 120,
      "density": {
        "enable": true,
        "value_area": 1500
      }
    },
    "color": {
      "value": ["#2ecc71", "#8e44ad", "#3498db", "#FFD700", "#ff66cc", "#7f8c8d"]
    },
    "shape": {
      "type": "circle"
    },
    "opacity": {
      "value": 0.7,
      "random": true
    },
    "size": {
      "value": 4,
      "random": true
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out"
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": false
      }
    },
    "modes": {
      "grab": {
        "distance": 200,
        "line_linked": {
          "opacity": 0.8
        }
      }
    }
  },
  "retina_detect": true
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
  'Commun': '#2ecc71',
  'UnCommun': '#8e44ad',
  'Rare': '#3498db',
  'Legendaire': '#FFD700',
  'Mythique': '#ff66cc',
  'Secret': '#7f8c8d'
};

// ========================================
// FONCTION RECHERCHE
// ========================================
searchBar.addEventListener('input', () => {
  const filter = searchBar.value.toLowerCase().trim();
  
  imageCards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    
    if (title.includes(filter)) {
      card.style.display = 'block';
      card.style.animation = 'fadeIn 0.3s ease';
    } else {
      card.style.display = 'none';
    }
  });
});

// ========================================
// FONCTION DE TRI
// ========================================
function sortCards(compareFn) {
  const container = document.querySelector('.images-container');
  const cardsArray = Array.from(imageCards);
  
  cardsArray.sort(compareFn).forEach(card => {
    container.appendChild(card);
  });
  
  // Animation après tri
  cardsArray.forEach((card, index) => {
    card.style.animation = 'none';
    setTimeout(() => {
      card.style.animation = `fadeInUp 0.4s ease ${index * 0.05}s forwards`;
    }, 10);
  });
}

// ========================================
// TRIER PAR RARETÉ
// ========================================
sortRarity.addEventListener('click', () => {
  const rarityOrder = ['Commun', 'UnCommun', 'Rare', 'Legendaire', 'Mythique', 'Secret'];
  
  sortCards((a, b) => {
    return rarityOrder.indexOf(a.dataset.rarity) - rarityOrder.indexOf(b.dataset.rarity);
  });
  
  // Animation du bouton
  animateButton(sortRarity);
});

// ========================================
// TRIER PAR PRIX CROISSANT
// ========================================
sortPriceAsc.addEventListener('click', () => {
  sortCards((a, b) => {
    return parseInt(a.dataset.price) - parseInt(b.dataset.price);
  });
  
  animateButton(sortPriceAsc);
});

// ========================================
// TRIER PAR PRIX DÉCROISSANT
// ========================================
sortPriceDesc.addEventListener('click', () => {
  sortCards((a, b) => {
    return parseInt(b.dataset.price) - parseInt(a.dataset.price);
  });
  
  animateButton(sortPriceDesc);
});

// ========================================
// ANIMATION BOUTON
// ========================================
function animateButton(button) {
  button.style.transform = 'scale(0.95)';
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 100);
}

// ========================================
// OUVRIR POPUP
// ========================================
imageCards.forEach(card => {
  card.addEventListener('click', () => {
    const rarity = card.dataset.rarity;
    const color = rarityColors[rarity];
    
    // Afficher popup et overlay
    popup.classList.add('show');
    popupOverlay.classList.add('show');
    
    // Remplir les informations
    popupImage.src = card.dataset.img;
    popupImage.alt = card.dataset.title;
    
    popupTitle.textContent = card.dataset.title;
    
    popupRarity.textContent = `Rareté: ${rarity}`;
    popupRarity.style.color = color;
    popupRarity.style.textShadow = `0 0 20px ${color}`;
    
    // Formatter le prix avec espaces
    const formattedPrice = card.dataset.price.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    priceText.textContent = `Prix: ${formattedPrice} 💰`;
    priceText.style.color = '#06ffa5';
    priceText.style.textShadow = '0 0 20px rgba(6, 255, 165, 0.5)';
    
    popupBonus.textContent = `Bonus: ${card.dataset.bonus}`;
    popupBonus.style.color = '#FFFF00';
    popupBonus.style.textShadow = '0 0 20px rgba(255, 255, 0, 0.5)';
    
    // Bloquer le scroll du body
    document.body.style.overflow = 'hidden';
  });
});

// ========================================
// FERMER POPUP
// ========================================
function closePopup() {
  popup.classList.remove('show');
  popupOverlay.classList.remove('show');
  document.body.style.overflow = 'auto';
}

// Fermer avec X
popupClose.addEventListener('click', closePopup);

// Fermer avec overlay
popupOverlay.addEventListener('click', closePopup);

// Fermer avec Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && popup.classList.contains('show')) {
    closePopup();
  }
});

// ========================================
// ANIMATION AU CHARGEMENT
// ========================================
window.addEventListener('load', () => {
  imageCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 50);
  });
});

// ========================================
// EFFET PARALLAX SUR LE TITRE
// ========================================
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const mainTitle = document.getElementById('mainTitle');
  
  if (mainTitle) {
    mainTitle.style.transform = `translateY(${scrollTop * 0.3}px)`;
    mainTitle.style.opacity = Math.max(0, 1 - scrollTop / 300);
  }
  
  lastScrollTop = scrollTop;
});

// ========================================
// EFFET DE LUEUR DYNAMIQUE AU SURVOL
// ========================================
imageCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    const rarity = this.dataset.rarity;
    const color = rarityColors[rarity];
    
    this.style.boxShadow = `0 0 50px ${color}, 0 20px 60px rgba(0, 0, 0, 0.5)`;
  });
  
  card.addEventListener('mouseleave', function() {
    const rarity = this.dataset.rarity;
    const color = rarityColors[rarity];
    const baseOpacity = rarity === 'Secret' ? 0.5 : 0.3;
    const rgbColor = hexToRgb(color);
    
    this.style.boxShadow = `0 0 30px rgba(${rgbColor}, ${baseOpacity}), inset 0 0 20px rgba(${rgbColor}, 0.1)`;
  });
});

// ========================================
// FONCTION UTILITAIRE HEX TO RGB
// ========================================
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result 
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '255, 255, 255';
}

// ========================================
// ANIMATION PULSATION POUR CARTES SECRET
// ========================================
const secretCards = document.querySelectorAll('.glow-Secret');
let secretPulse = true;

setInterval(() => {
  secretCards.forEach(card => {
    if (!card.matches(':hover')) {
      card.style.transition = 'transform 1s ease';
      card.style.transform = secretPulse ? 'scale(1.02)' : 'scale(1)';
    }
  });
  secretPulse = !secretPulse;
}, 2000);

// ========================================
// AJOUTER ANIMATIONS CSS DYNAMIQUES
// ========================================
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
`;
document.head.appendChild(style);

// ========================================
// EFFET SHIMMER SUR LES CARTES LÉGENDAIRES+
// ========================================
const legendaryCards = document.querySelectorAll('.glow-Legendaire, .glow-Mythique, .glow-Secret');
legendaryCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.backgroundImage = 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)';
    this.style.backgroundSize = '1000px 100%';
    this.style.animation = 'shimmer 2s infinite';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.animation = 'none';
    this.style.backgroundImage = 'none';
  });
});

// ========================================
// COMPTEUR DE CARTES
// ========================================
function updateCardCount() {
  const visibleCards = Array.from(imageCards).filter(card => card.style.display !== 'none');
  console.log(`🃏 Cartes visibles: ${visibleCards.length}/${imageCards.length}`);
}

searchBar.addEventListener('input', updateCardCount);

// ========================================
// EFFET SONORE (optionnel - commenté)
// ========================================
/*
function playSound(type) {
  const audio = new Audio(`sounds/${type}.mp3`);
  audio.volume = 0.3;
  audio.play().catch(err => console.log('Audio play prevented:', err));
}

imageCards.forEach(card => {
  card.addEventListener('click', () => {
    const rarity = card.dataset.rarity;
    playSound(rarity.toLowerCase());
  });
});
*/

// ========================================
// LOGS DE DÉMARRAGE
// ========================================
console.log('%c🔥 I AM A COWBOY 🔥', 'color: #ff006e; font-size: 24px; font-weight: bold;');
console.log('%c⚡ Website loaded successfully!', 'color: #06ffa5; font-size: 16px;');
console.log(`%c📊 Total cards: ${imageCards.length}`, 'color: #3498db; font-size: 14px;');
console.log('%c🎨 Developed by Zaynox', 'color: #8338ec; font-size: 14px;');

// ========================================
// GESTION DES ERREURS D'IMAGES
// ========================================
imageCards.forEach(card => {
  const img = card.querySelector('img');
  img.addEventListener('error', function() {
    this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="150"%3E%3Crect fill="%23333" width="150" height="150"/%3E%3Ctext fill="rgba(255,255,255,0.5)" font-family="Arial" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage non trouvée%3C/text%3E%3C/svg%3E';
    console.warn(`⚠️ Image non trouvée: ${card.dataset.img}`);
  });
});

// ========================================
// OPTIMISATION PERFORMANCE
// ========================================
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    // Opérations après scroll
  }, 100);
}, { passive: true });

// ========================================
// FIN DU SCRIPT
// ========================================
