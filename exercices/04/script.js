// 04 — Charger les ateliers avec fetch
// Exercice : Gère les statuts HTTP en erreur avant de lire le JSON. Affiche un message qui contient le statut.
// Résultat attendu : Clique sur « Simuler une erreur HTTP ». La page doit afficher « Chargement impossible (HTTP 404). » Le bouton Réessayer doit recharger le vrai catalogue.
// L’état contient le dernier catalogue chargé avec succès.
let ateliers = [];
const liste = document.querySelector('#liste');
const statut = document.querySelector('#statut');
const recherche = document.querySelector('#recherche');
const categorie = document.querySelector('#categorie');
const favorisSeuls = document.querySelector('#favoris-seuls');

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
    const favoriCorrespond = !favorisSeuls.checked || favoris.includes(atelier.id);
    return titreCorrespond && categorieCorrespond && favoriCorrespond;
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
favorisSeuls.addEventListener('change', afficher);

const reessayer = document.querySelector('#reessayer');
const simuler = document.querySelector('#simuler');
const controles = [reessayer, simuler, recherche, categorie, favorisSeuls];

async function charger(url = '../../data/ateliers.json') {
  for (const controle of controles) controle.disabled = true;
  liste.replaceChildren();
  statut.textContent = 'Chargement des ateliers…';

  try {
    // await suspend cette fonction pendant la réponse, sans bloquer la page.
    const reponse = await fetch(url);
    // TODO : teste reponse.ok avant de lire le JSON.
    // json() lit le corps HTTP et le convertit en valeurs JavaScript.
    const donnees = await reponse.json();
    ateliers = donnees;
    afficher();
  } catch (erreur) {
    ateliers = [];
    statut.textContent = erreur.message;
  } finally {
    // finally réactive les contrôles dans les deux cas.
    for (const controle of controles) controle.disabled = false;
  }
}

reessayer.addEventListener('click', () => charger());
simuler.addEventListener('click', () => charger('../../data/introuvable.json'));
charger();
