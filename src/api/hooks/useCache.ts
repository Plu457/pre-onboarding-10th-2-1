const useCache = <T>() => {
  const setCacheWithExpiry = (key: string, value: T, ttl: number) => {
    const item = {
      value,
      expiry: new Date().getTime() + ttl,
    };

    const cache = sessionStorage.getItem('inputCache');
    const cacheData = cache ? JSON.parse(cache) : {};

    const maxCacheSize = 30;
    if (Object.keys(cacheData).length >= maxCacheSize) {
      const oldestKey = Object.keys(cacheData).reduce((oldest, current) => {
        return cacheData[current].expiry < cacheData[oldest].expiry ? current : oldest;
      });

      delete cacheData[oldestKey];
    }

    cacheData[key] = item;
    sessionStorage.setItem('inputCache', JSON.stringify(cacheData));
  };

  const getCacheWithExpiry = (key: string): T | null => {
    const cache = sessionStorage.getItem('inputCache');
    if (!cache) {
      return null;
    }

    const cacheData = JSON.parse(cache);
    const item = cacheData[key];

    if (!item) {
      return null;
    }

    const currentTime = new Date().getTime();
    if (currentTime > item.expiry) {
      delete cacheData[key];
      sessionStorage.setItem('inputCache', JSON.stringify(cacheData));
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
