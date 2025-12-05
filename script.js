document.addEventListener("DOMContentLoaded", function() {
  
  // --- ÉLÉMENTS PRINCIPAUX ---
  const imageDeFond = document.querySelector('#mon-image-de-fond'); 
  const imageNumero2 = document.querySelector('#seconde-image');    
  
  // SONS
  const leSon = document.querySelector('#son-pop'); 
  const leSonMusique = document.querySelector('#son-musique'); 
  
  // --- LISTE IMAGES DÉCORATIVES ---
  const images3D = [
    document.querySelector('#image-decalee1'),
    document.querySelector('#image-decalee2'),
    document.querySelector('#image-decalee4'),
    document.querySelector('#image-decalee5'),
    document.querySelector('#image-decalee6'),
    document.querySelector('#image-decalee7'),
    document.querySelector('#image-decalee8'),
    document.querySelector('#image-decalee9'),
    document.querySelector('#image-decalee10'),
    document.querySelector('#image-decalee11')
  ];
  
  // --- BOUTONS ---
  const btnDroite = document.querySelector('#bouton-droite');       // Rouge
  const btnGauche = document.querySelector('#bouton-gauche');       // Bleu
  const btnJaune = document.querySelector('#bouton-jaune');         // Jaune
  const btnVert = document.querySelector('#bouton-musiquetop3');    // Vert
  const btnEcoles = document.querySelector('#bouton-ecoles');       // VIOLET (Nouveau)
  const btnLien = document.querySelector('#bouton-lien');           // Switch

  // --- POP-UP ---
  const imgDroite = document.querySelector('#image-droite'); // Image rouge
  const imgJaune = document.querySelector('#image-jaune');   
  
  // GRAPHIQUES 3D
  const graphique3D = document.querySelector('#graphique-3d');      // Podium
  const zoneFermetureGraph = document.querySelector('#zone-fermeture-graph');

  // GROUPE ECOLES (VIOLET)
  const groupeEcoles = document.querySelector('#groupe-ecoles');
  const zoneFermetureEcoles = document.querySelector('#zone-fermeture-ecoles');

  // CONTENEURS
  const conteneurChapeaux = document.querySelector('#conteneur-chapeaux');
  const conteneurConfettis = document.querySelector('#conteneur-confettis');
  const conteneurDiplomes = document.querySelector('#conteneur-diplomes');
  const txtLien = document.querySelector('#texte-lien');

  let modeAlternatifActif = false; 

  // =========================================================
  // INIT
  // =========================================================
  images3D.forEach(function(img) {
      if(img) img.setAttribute('visible', 'false');
  });

  // =========================================================
  // FONCTION CONFETTIS (VERT)
  // =========================================================
  function lancerConfettis() {
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500'];
    conteneurConfettis.innerHTML = ''; 

    for (let i = 0; i < 50; i++) {
        let confetti = document.createElement('a-plane');
        let x = (Math.random() - 0.5) * 1.2; 
        let y = 1.5 + Math.random(); 
        let z = (Math.random() - 0.5) * 0.5;
        let couleur = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.setAttribute('position', `${x} ${y} ${z}`);
        confetti.setAttribute('width', '0.04');
        confetti.setAttribute('height', '0.04');
        confetti.setAttribute('color', couleur);
        confetti.setAttribute('side', 'double'); 
        confetti.setAttribute('rotation', `${Math.random()*360} ${Math.random()*360} 0`);

        let duration = 1500 + Math.random() * 1500; 
        confetti.setAttribute('animation__fall', {
            property: 'position', to: `${x} -1.5 ${z}`, dur: duration, easing: 'linear'
        });
        confetti.setAttribute('animation__spin', {
            property: 'rotation', to: `${Math.random()*720} ${Math.random()*720} 0`, dur: duration, easing: 'linear'
        });

        conteneurConfettis.appendChild(confetti);
    }
    setTimeout(() => { conteneurConfettis.innerHTML = ''; }, 3500);
  }

  // =========================================================
  // FONCTION PLUIE DIPLÔMES (JAUNE)
  // =========================================================
  function lancerDiplomes() {
    conteneurDiplomes.innerHTML = ''; 

    for (let i = 0; i < 90; i++) {
        let diplome = document.createElement('a-box');
        
        let x = (Math.random() - 0.5) * 1.5; 
        let y = 1.5 + Math.random() * 1.5; 
        let z = (Math.random() - 0.5) * 0.8;

        diplome.setAttribute('position', `${x} ${y} ${z}`);
        diplome.setAttribute('width', '0.25');  
        diplome.setAttribute('height', '0.35'); 
        diplome.setAttribute('depth', '0.001');
        
        diplome.setAttribute('material', 'src: #texture-diplome; transparent: true');
        
        diplome.setAttribute('rotation', `${Math.random()*360} ${Math.random()*360} ${Math.random()*360}`);

        let delai = Math.random() * 2000; 
        let duration = 2000 + Math.random() * 2000; 
        
        diplome.setAttribute('animation__fall', {
            property: 'position', 
            to: `${x} -2.0 ${z}`, 
            dur: duration, 
            delay: delai, 
            easing: 'linear'
        });
        
        diplome.setAttribute('animation__spin', {
            property: 'rotation', 
            to: `${Math.random()*1000} ${Math.random()*1000} ${Math.random()*1000}`, 
            dur: duration,
            delay: delai,
            easing: 'easeInOutSine'
        });

        conteneurDiplomes.appendChild(diplome);
    }

    setTimeout(() => {
        conteneurDiplomes.innerHTML = ''; 
        if(imageDeFond) imageDeFond.emit('closeAnimation'); 
        toggleButtons(true); 
    }, 6000); 
  }

  // =========================================================
  // GESTION VISIBILITÉ BOUTONS
  // =========================================================
  function toggleButtons(show) {
    if(show) {
      if(btnDroite) { btnDroite.setAttribute('visible', 'true'); btnDroite.classList.add('clickable'); }
      if(btnGauche) { btnGauche.setAttribute('visible', 'true'); btnGauche.classList.add('clickable'); }
      if(btnJaune)  { btnJaune.setAttribute('visible', 'true');  btnJaune.classList.add('clickable'); }
      if(btnVert)   { btnVert.setAttribute('visible', 'true');   btnVert.classList.add('clickable'); }
      if(btnEcoles) { btnEcoles.setAttribute('visible', 'true'); btnEcoles.classList.add('clickable'); }
    } else {
      if(btnDroite) { btnDroite.setAttribute('visible', 'false'); btnDroite.classList.remove('clickable'); }
      if(btnGauche) { btnGauche.setAttribute('visible', 'false'); btnGauche.classList.remove('clickable'); }
      if(btnJaune)  { btnJaune.setAttribute('visible', 'false');  btnJaune.classList.remove('clickable'); }
      if(btnVert)   { btnVert.setAttribute('visible', 'false');   btnVert.classList.remove('clickable'); }
      if(btnEcoles) { btnEcoles.setAttribute('visible', 'false'); btnEcoles.classList.remove('clickable'); }
    }
  }

  // =========================================================
  // 1. BOUTON ROUGE (IMAGE DROITE)
  // =========================================================
  if (btnDroite) {
      btnDroite.addEventListener('click', function () {
        if(imgDroite) imgDroite.setAttribute('visible', 'true');
        toggleButtons(false); 
        
        if(imageDeFond) imageDeFond.emit('startAnimation');
        if(imgDroite) imgDroite.emit('startAnimation');
        if(leSon) { leSon.currentTime = 0; leSon.play(); } 
      });
  }
  if (imgDroite) {
      imgDroite.addEventListener('click', function () {
        if(imageDeFond) imageDeFond.emit('closeAnimation');
        imgDroite.emit('closeAnimation');
        if(leSon) { leSon.currentTime = 0; leSon.play(); } 

        setTimeout(() => {
          imgDroite.setAttribute('visible', 'false');
          toggleButtons(true);
        }, 2000);
      });
  }

  // =========================================================
  // 2. BOUTON JAUNE (PLUIE DE 90 DIPLÔMES)
  // =========================================================
  if (btnJaune) {
      btnJaune.addEventListener('click', function () {
        lancerDiplomes();
        toggleButtons(false); 
        if(imageDeFond) imageDeFond.emit('startAnimation');
        if(leSon) { leSon.currentTime = 0; leSon.play(); } 
      });
  }

  // =========================================================
  // 3. BOUTON VERT (Graphique 3D + Confettis)
  // =========================================================
  if (btnVert) {
      btnVert.addEventListener('click', function () {
        if(graphique3D) {
            graphique3D.setAttribute('visible', 'true');
            graphique3D.emit('openGraph');
        }
        toggleButtons(false); 
        
        lancerConfettis();

        if(imageDeFond) imageDeFond.emit('startAnimation');
        if(leSonMusique) { 
            leSonMusique.currentTime = 0; 
            leSonMusique.play(); 
        }
      });
  }
  
  if (zoneFermetureGraph) {
    zoneFermetureGraph.addEventListener('click', function () {
        if(imageDeFond) imageDeFond.emit('closeAnimation');
        if(graphique3D) graphique3D.emit('closeGraph');
        
        if(leSonMusique) { 
            leSonMusique.pause();       
            leSonMusique.currentTime = 0; 
        }

        setTimeout(() => {
          if(graphique3D) graphique3D.setAttribute('visible', 'false');
          toggleButtons(true);
        }, 600);
      });
  }

  // =========================================================
  // 4. BOUTON VIOLET (6 ECOLES) - NOUVEAU
  // =========================================================
  if (btnEcoles) {
      btnEcoles.addEventListener('click', function () {
        if(groupeEcoles) {
            groupeEcoles.setAttribute('visible', 'true');
            groupeEcoles.emit('openEcoles');
        }
        toggleButtons(false); 
        
        if(imageDeFond) imageDeFond.emit('startAnimation');
        if(leSon) { leSon.currentTime = 0; leSon.play(); }
      });
  }

  if (zoneFermetureEcoles) {
    zoneFermetureEcoles.addEventListener('click', function () {
        if(imageDeFond) imageDeFond.emit('closeAnimation');
        if(groupeEcoles) groupeEcoles.emit('closeEcoles');
        if(leSon) { leSon.currentTime = 0; leSon.play(); }

        setTimeout(() => {
          if(groupeEcoles) groupeEcoles.setAttribute('visible', 'false');
          toggleButtons(true);
        }, 600);
      });
  }

  // =========================================================
  // 5. BOUTON BLEU (Chapeaux)
  // =========================================================
  function genererLesChapeaux() {
    conteneurChapeaux.innerHTML = ''; 
    let zone = document.createElement('a-plane');
    zone.classList.add('clickable'); 
    zone.setAttribute('opacity', '0.001'); 
    zone.setAttribute('width', '1.5'); 
    zone.setAttribute('height', '2.3');
    zone.setAttribute('position', '0 0 0');
    
    zone.addEventListener('click', function() {
       if(leSon) { leSon.currentTime = 0; leSon.play(); } 
       const tousLesChapeaux = conteneurChapeaux.querySelectorAll('a-gltf-model');
       tousLesChapeaux.forEach(el => el.emit('close'));

       setTimeout(() => {
         conteneurChapeaux.setAttribute('visible', 'false');
         conteneurChapeaux.innerHTML = ''; 
         toggleButtons(true); 
       }, 600);
    });
    conteneurChapeaux.appendChild(zone);

    for (let i = 0; i < 20; i++) {
      let chapeau = document.createElement('a-gltf-model');
      chapeau.setAttribute('src', '#modele-chapeau');
      let x = (Math.random() - 0.5) * 1.5; 
      let y = (Math.random() - 0.5) * 2; 
      let zSol = 0.05; 
      let scaleFinal = 0.05 + Math.random() * 0.05; 
      let delay = Math.random() * 400;

      chapeau.setAttribute('position', `${x} ${y} ${zSol}`);
      chapeau.setAttribute('scale', '0 0 0');
      chapeau.setAttribute('rotation', `${Math.random()*360} ${Math.random()*360} 0`);

      chapeau.setAttribute('animation__pop', { property: 'scale', to: `${scaleFinal} ${scaleFinal} ${scaleFinal}`, dur: 500, easing: 'easeOutBack', startEvents: 'go', delay: delay });
      chapeau.setAttribute('animation__saut', { property: 'position', from: `${x} ${y} ${zSol}`, to: `${x} ${y} ${zSol + 0.8}`, dur: 600, dir: 'alternate', loop: 1, easing: 'easeInOutQuad', startEvents: 'go', delay: delay });
      chapeau.setAttribute('animation__close_scale', { property: 'scale', to: '0 0 0', dur: 500, startEvents: 'close' });
      chapeau.setAttribute('animation__close_pos', { property: 'position', to: `${x} ${y} ${zSol}`, dur: 500, startEvents: 'close' });

      conteneurChapeaux.appendChild(chapeau);
    }
  }

  if (btnGauche) {
      btnGauche.addEventListener('click', function () {
        genererLesChapeaux();
        conteneurChapeaux.setAttribute('visible', 'true');
        toggleButtons(false); 
        if(leSon) { leSon.currentTime = 0; leSon.play(); } 
        setTimeout(() => {
            const els = conteneurChapeaux.querySelectorAll('a-gltf-model');
            els.forEach(el => el.emit('go'));
        }, 50);
      });
  }

  // =========================================================
  // 6. SWITCH MODE (2D <-> 3D)
  // =========================================================
  if (btnLien) {
    btnLien.addEventListener('click', function() {
       if(leSon) { leSon.currentTime = 0; leSon.play(); } 

       if (modeAlternatifActif === false) {
           if(imageDeFond) imageDeFond.setAttribute('visible', 'false');
           if(imageNumero2) imageNumero2.setAttribute('visible', 'true');
           
           images3D.forEach(function(img) {
               if(img) img.setAttribute('visible', 'true');
           });

           if(txtLien) txtLien.setAttribute('value', 'Retour affiche');
           toggleButtons(false); 
           modeAlternatifActif = true;

       } else {
           if(imageDeFond) imageDeFond.setAttribute('visible', 'true');
           if(imageNumero2) imageNumero2.setAttribute('visible', 'false');

           images3D.forEach(function(img) {
               if(img) img.setAttribute('visible', 'false');
           });

           if(txtLien) txtLien.setAttribute('value', "Voir l'affiche en 3D");
           toggleButtons(true); 
           modeAlternatifActif = false;
       }
    });
  }
});