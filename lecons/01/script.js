// 01 — Afficher le catalogue avec le DOM
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
function creerCarte(atelier) {
  // createElement crée un élément en mémoire. append l’insère ensuite.
  const carte = document.createElement('li');
  const titre = document.createElement('h2');
  const details = document.createElement('p');

  // textContent insère la donnée comme texte.
  titre.textContent = atelier.titre;
  details.textContent = atelier.categorie;
  carte.append(titre, details);
  return carte;
}

function afficher() {
  const visibles = ateliers;
  // On vide la liste avant de la reconstruire pour éviter les doublons.
  liste.replaceChildren();
  for (const atelier of visibles) {
    liste.append(creerCarte(atelier));
  }
  statut.textContent = visibles.length === 0 ? 'Aucun atelier trouvé.' : visibles.length + ' atelier(s) affiché(s).';
}

afficher();
