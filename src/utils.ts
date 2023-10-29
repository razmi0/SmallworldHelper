export const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
export const saveToLocalStorage = (key: string, value: unknown) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
export const getFromLocalStorage = (key: string) => {
  return JSON.parse(window.localStorage.getItem(key) || "null");
};
