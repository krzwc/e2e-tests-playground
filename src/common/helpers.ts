export const localStorageFacade = {
  key: "favoriteJobOffers",
  getFavoriteJobOffers: () => {
    return JSON.parse(localStorage.getItem(localStorageFacade.key) ?? "[]"); // TODO - try... catch...
  },
  updateFavoriteJobOffers: (value: string[]) => {
    const currentFavoriteJobOffersSet = new Set(value);
    localStorage.setItem(
      localStorageFacade.key,
      JSON.stringify(Array.from(currentFavoriteJobOffersSet).sort())
    );
  },
};
