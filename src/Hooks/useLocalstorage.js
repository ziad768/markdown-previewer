export const useLocalStorage = () => {
  const data = localStorage.data || "";
  const setData = (newData) => {
    localStorage.data = newData;
  };
  return [data, setData];
};
