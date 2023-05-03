const useCache = <T>() => {
  const setCacheWithExpiry = (key: string, value: T, ttl: number) => {
    const item = {
      value,
      expiry: new Date().getTime() + ttl,
    };
    sessionStorage.setItem(key, JSON.stringify(item));
  };

  const getCacheWithExpiry = (key: string): T | null => {
    const itemStr = sessionStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const currentTime = new Date().getTime();
    if (currentTime > item.expiry) {
      sessionStorage.removeItem(key);
      return null;
    }
    return item.value;
  };

  const removeCache = (searchTerm: string) => {
    sessionStorage.removeItem(`inputCache_${searchTerm}`);
  };

  return { setCacheWithExpiry, getCacheWithExpiry, removeCache };
};

export default useCache;
