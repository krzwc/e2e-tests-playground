export const localStorageFacade = {
  key: "favoriteJobOffers",
  setFavoriteJobOffers: (favoriteOffersSet: Set<string>) => {
    localStorage.setItem(
      localStorageFacade.key,
      JSON.stringify(Array.from(favoriteOffersSet).sort())
    );
  },
  getFavoriteJobOffers: () => {
    return JSON.parse(localStorage.getItem(localStorageFacade.key) ?? "[]"); // TODO - try... catch...
  },
  addOfferToFavoriteJobOffers: (value: string) => {
    const currentFavoriteJobOffers: string[] = localStorageFacade.getFavoriteJobOffers();

    const currentFavoriteJobOffersSet = new Set(currentFavoriteJobOffers);
    if (!currentFavoriteJobOffersSet.has(value)) {
      currentFavoriteJobOffersSet.add(value);
    }
    localStorageFacade.setFavoriteJobOffers(currentFavoriteJobOffersSet);
  },
  deleteOfferFromFavoriteJobOffers: (value: string) => {
    const currentFavoriteJobOffers: string[] = localStorageFacade.getFavoriteJobOffers();

    const currentFavoriteJobOffersSet = new Set(currentFavoriteJobOffers);
    if (currentFavoriteJobOffersSet.has(value)) {
      currentFavoriteJobOffersSet.delete(value);
    }
    localStorageFacade.setFavoriteJobOffers(currentFavoriteJobOffersSet);
  },
};
