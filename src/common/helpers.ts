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

export const classNames = (...args: Array<string | boolean | undefined>) =>
  args.join(" ");

export const isEmpty = (value: unknown): boolean => {
  if (typeof value === "undefined") {
    return true;
  }
  if (typeof value === "object") {
    // null
    if (value === null) {
      return true;
    }
    // Array
    if (value !== null && Array.isArray(value) && value.length === 0) {
      return true;
    }
    // Object
    if (Object.keys(value).length === 0 && value.constructor === Object) {
      return true;
    }
  }
  return false;
};

export const isNotEmpty = (value: unknown): boolean => !isEmpty(value);
