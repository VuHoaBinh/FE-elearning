export const handleLocalStorage = {
  setLocalStorage: (name: string, data: Object) =>
    localStorage.setItem(name, JSON.stringify(data)),
  getLocalStorageItem: (name: string) =>
    JSON.parse(localStorage.getItem(name) as string),
  removeLocalStorageItem: (name: string) => localStorage.removeItem(name),
  clearAllLocalStorage: () => localStorage.clear(),
};
