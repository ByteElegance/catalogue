// 03 — Sélectionner et mémoriser des favoris
// Un tableau contient plusieurs ateliers. Chaque objet décrit un atelier.
// id identifie l’atelier même si son titre change.
const ateliers = [
  {
    "id": "html",
    "titre": "Construire une page accessible",
    "categorie": "HTML",
    "minutes": 35
  },
  {
    "id": "grid",
    "titre": "Créer une grille responsive",
    "categorie": "CSS",
    "minutes": 45
  },
  {
    "id": "flex",
    "titre": "Aligner une barre de navigation",
    "categorie": "CSS",
    "minutes": 25
  },
  {
    "id": "dom",
    "titre": "Afficher des cartes avec le DOM",
    "categorie": "JavaScript",
    "minutes": 50
  },
  {
    "id": "fetch",
    "titre": "Charger un catalogue JSON",
    "categorie": "JavaScript",
    "minutes": 60
  }
];
const liste = document.querySelector('#liste');
const statut = document.querySelector('#statut');
const recherche = document.querySelector('#recherche');
const categorie = document.querySelector('#categorie');

// localStorage stocke du texte dans le navigateur pour cette adresse.
// stringify convertit le tableau en JSON. parse relit ce texte.
const cleFavoris = 'forge-ateliers-favoris';
function lireFavoris() {
  try {
    const valeur = JSON.parse(localStorage.getItem(cleFavoris) ?? '[]');
    return Array.isArray(valeur) ? valeur.filter(id => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

function ecrireFavoris(ids) {
  localStorage.setItem(cleFavoris, JSON.stringify(ids));
}


const favoris = lireFavoris();

function basculerFavori(id) {
  // indexOf renvoie -1 si l’identifiant est absent.
  const position = favoris.indexOf(id);
  if (position === -1) {
    favoris.push(id);
  } else {
    favoris.splice(position, 1);
  }
  ecrireFavoris(favoris);
  afficher();
  // Le rendu recrée le bouton. On y replace le focus pour l’usage au clavier.
  liste.querySelector('[data-id="' + id + '"]')?.focus();
}

function creerCarte(atelier) {
  // createElement crée un élément en mémoire. append l’insère ensuite.
  const carte = document.createElement('li');
  const titre = document.createElement('h2');
  const details = document.createElement('p');

  // textContent insère la donnée comme texte.
  titre.textContent = atelier.titre;
  details.textContent = atelier.categorie + ' · ' + atelier.minutes + ' min';
  carte.append(titre, details);
  const bouton = document.createElement('button');
  bouton.type = 'button';
  bouton.textContent = 'Favori';
  bouton.dataset.id = atelier.id;
  bouton.setAttribute('aria-label', 'Favori : ' + atelier.titre);
  bouton.setAttribute('aria-pressed', String(favoris.includes(atelier.id)));
  bouton.addEventListener('click', () => basculerFavori(atelier.id));
  carte.append(bouton);
  return carte;
}

function filtrerAteliers() {
  const mot = recherche.value.trim().toLowerCase();
  // filter conserve les objets pour lesquels la fonction renvoie true.
  return ateliers.filter(atelier => {
    const titreCorrespond = atelier.titre.toLowerCase().includes(mot);
    const categorieCorrespond = categorie.value === '' || atelier.categorie === categorie.value;
    return titreCorrespond && categorieCorrespond;
  });
}

function afficher() {
  const visibles = filtrerAteliers();
  // On vide la liste avant de la reconstruire pour éviter les doublons.
  liste.replaceChildren();
  for (const atelier of visibles) {
    liste.append(creerCarte(atelier));
  }
  statut.textContent = visibles.length === 0 ? 'Aucun atelier trouvé.' : visibles.length + ' atelier(s) affiché(s).';
}

// input se déclenche pendant la saisie. change réagit à la sélection.
recherche.addEventListener('input', afficher);
categorie.addEventListener('change', afficher);

afficher();
