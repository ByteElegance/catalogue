// 02 — Rechercher et filtrer les ateliers
// Exercice : Fais en sorte que la recherche ignore les majuscules et les espaces au début et à la fin.
// Résultat attendu : Avec CSS sélectionné, saisir «  GRILLE  » doit afficher uniquement l’atelier Grid.
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
function creerCarte(atelier) {
  // createElement crée un élément en mémoire. append l’insère ensuite.
  const carte = document.createElement('li');
  const titre = document.createElement('h2');
  const details = document.createElement('p');

  // textContent insère la donnée comme texte.
  titre.textContent = atelier.titre;
  details.textContent = atelier.categorie + ' · ' + atelier.minutes + ' min';
  carte.append(titre, details);
  return carte;
}

function filtrerAteliers() {
  // TODO : transforme la saisie et le titre avant includes.
  const mot = recherche.value;
  // filter conserve les objets pour lesquels la fonction renvoie true.
  return ateliers.filter(atelier => {
    const titreCorrespond = atelier.titre.includes(mot);
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
