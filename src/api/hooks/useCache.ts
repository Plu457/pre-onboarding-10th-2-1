const useCache = <T>() => {
  const cacheName = 'inputCache';

  const setCacheWithExpiry = async (key: string, value: T, ttl: number) => {
    const item = {
      value,
      expiry: new Date().getTime() + ttl,
    };

    const cache = await caches.open(cacheName);
    await cache.put(key, new Response(JSON.stringify(item)));
  };

  const getCacheWithExpiry = async (key: string): Promise<T | null> => {
    const cache = await caches.open(cacheName);
    const response = await cache.match(key);

    if (!response) {
      return null;
    }

    const item = await response.json();

    const currentTime = new Date().getTime();
    if (currentTime > item.expiry) {
      await cache.delete(key);
      return null;
    }

    return item.value;
  };

  const removeCache = async (searchTerm: string) => {
    const cache = await caches.open(cacheName);
    await cache.delete(`inputCache_${searchTerm}`);
  };

  return { setCacheWithExpiry, getCacheWithExpiry, removeCache };
};

export default useCache;
