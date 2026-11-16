// Le module connaît la clé. Le reste de l’application utilise ses deux fonctions.
const cleFavoris = 'forge-ateliers-favoris';

export function lireFavoris() {
  try {
    const valeur = JSON.parse(localStorage.getItem(cleFavoris) ?? '[]');
    return Array.isArray(valeur) ? valeur.filter(id => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export function ecrireFavoris(ids) {
  localStorage.setItem(cleFavoris, JSON.stringify(ids));
}
