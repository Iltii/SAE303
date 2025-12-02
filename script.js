document.addEventListener("DOMContentLoaded", function() {
  
  // --- RÉCUPÉRATION DES ÉLÉMENTS ---
  const imageDeFond = document.querySelector('#mon-image-de-fond');
  const leSon = document.querySelector('#son-pop');
  
  const btnDroite = document.querySelector('#bouton-droite');
  const btnGauche = document.querySelector('#bouton-gauche');

  const imgDroite = document.querySelector('#image-droite');
  const conteneurChapeaux = document.querySelector('#conteneur-chapeaux');

  // --- FONCTION POUR GÉRER L'AFFICHAGE DU MENU ---
  function toggleButtons(show) {
    if(show) {
      // ON AFFICHE LE MENU
      btnDroite.setAttribute('visible', 'true');
      btnDroite.classList.add('clickable');
      btnGauche.setAttribute('visible', 'true');
      btnGauche.classList.add('clickable');
    } else {
      // ON CACHE LE MENU
      btnDroite.setAttribute('visible', 'false');
      btnDroite.classList.remove('clickable');
      btnGauche.setAttribute('visible', 'false');
      btnGauche.classList.remove('clickable');
    }
  }

  // =========================================================
  // 1. BOUTON DROIT (ROUGE - IMAGE SIMPLE)
  // =========================================================
  
  btnDroite.addEventListener('click', function () {
    imgDroite.setAttribute('visible', 'true');
    toggleButtons(false); // Cache le menu
    
    // Animation
    imageDeFond.emit('startAnimation');
    imgDroite.emit('startAnimation');
    leSon.currentTime = 0; leSon.play();
  });

  imgDroite.addEventListener('click', function () {
    // Animation Retour
    imageDeFond.emit('closeAnimation');
    imgDroite.emit('closeAnimation');
    leSon.currentTime = 0; leSon.play();

    // On attend la fin (2s) et on remet le menu
    setTimeout(() => {
      imgDroite.setAttribute('visible', 'false');
      toggleButtons(true); // <--- RETOUR MENU
    }, 2000);
  });


  // =========================================================
  // 2. BOUTON GAUCHE (BLEU - CHAPEAUX)
  // =========================================================
  
  function genererLesChapeaux() {
    conteneurChapeaux.innerHTML = ''; 

    // Zone invisible pour cliquer
    let zone = document.createElement('a-plane');
    zone.setAttribute('opacity', '0.001');
    zone.setAttribute('width', '5'); zone.setAttribute('height', '5');
    conteneurChapeaux.appendChild(zone);

    for (let i = 0; i < 20; i++) {
      let chapeau = document.createElement('a-gltf-model');
      chapeau.setAttribute('src', '#modele-chapeau');
      
      // Position de départ
      let x = (Math.random() - 0.5) * 1.5; 
      let y = (Math.random() - 0.5) * 2; 
      let zSol = 0.05; 
      
      // Paramètres
      let scaleFinal = 0.05 + Math.random() * 0.05; 
      let delay = Math.random() * 400;

      // Config de base
      chapeau.setAttribute('position', `${x} ${y} ${zSol}`);
      chapeau.setAttribute('scale', '0 0 0');
      chapeau.setAttribute('rotation', `${Math.random()*360} ${Math.random()*360} 0`);

      // --- ANIMATIONS OUVERTURE ---
      
      // 1. Grossir
      chapeau.setAttribute('animation__pop', {
        property: 'scale',
        to: `${scaleFinal} ${scaleFinal} ${scaleFinal}`,
        dur: 500,
        easing: 'easeOutBack',
        startEvents: 'go', 
        delay: delay
      });

      // 2. Sauter (Aller-Retour simple et stable)
      chapeau.setAttribute('animation__saut', {
        property: 'position',
        from: `${x} ${y} ${zSol}`,      
        to: `${x} ${y} ${zSol + 0.8}`,  
        dur: 600,
        dir: 'alternate', 
        loop: 1,          
        easing: 'easeInOutQuad',
        startEvents: 'go',
        delay: delay
      });

      // --- ANIMATIONS FERMETURE (DISPARAÎTRE DANS L'AFFICHE) ---

      // 1. Rétrécir
      chapeau.setAttribute('animation__close_scale', {
        property: 'scale', to: '0 0 0', dur: 500, startEvents: 'close'
      });
      
      // 2. Retourner collé à l'affiche (Aspiration)
      chapeau.setAttribute('animation__close_pos', {
        property: 'position', to: `${x} ${y} ${zSol}`, dur: 500, startEvents: 'close'
      });

      conteneurChapeaux.appendChild(chapeau);
    }
  }

  // Clic sur le bouton BLEU (Ouvrir)
  btnGauche.addEventListener('click', function () {
    genererLesChapeaux();
    
    conteneurChapeaux.setAttribute('visible', 'true');
    toggleButtons(false); // Cache le menu
    
    leSon.currentTime = 0; leSon.play();

    setTimeout(() => {
        const els = conteneurChapeaux.querySelectorAll('a-gltf-model');
        els.forEach(el => el.emit('go'));
    }, 50);
  });

});