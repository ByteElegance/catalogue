// Le module connaît la clé. Le reste de l’application utilise ses deux fonctions.
const cleFavoris = 'forge-ateliers-favoris';

export function lireFavoris() {
  return JSON.parse(localStorage.getItem(cleFavoris) ?? '[]');
  // TODO : intercepte les erreurs de lecture et valide la forme des données.
}

export function ecrireFavoris(ids) {
  localStorage.setItem(cleFavoris, JSON.stringify(ids));
}
