import { useState } from 'react';

interface UseSearchReturnType<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | undefined;
  isError: boolean;
  search: (searchTerm: string, useExpiry?: boolean) => Promise<void>;
  clearData: () => void;
  removeCache: (searchTerm: string) => void;
  saveRecentKeyword: (keyword: string) => void;
  getRecentKeywords: () => string[];
  setCacheWithExpiry: (key: string, value: T, ttl: number) => void;
  getCacheWithExpiry: (key: string) => T | null;
}

const useSearch = <T>(fetchAPI: (searchTerm: string) => Promise<T>): UseSearchReturnType<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const search = async (searchTerm: string) => {
    console.info('calling api');
    try {
      setIsLoading(true);
      await cacheSearch(searchTerm);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearData = () => setData(undefined);

  const saveRecentKeyword = (keyword: string) => {
    const recentKeywords = getRecentKeywords();
    if (!recentKeywords.includes(keyword)) {
      sessionStorage.setItem('recentlyKeyword', JSON.stringify([keyword, ...recentKeywords]));
    }
  };

  const getRecentKeywords = (): string[] => {
    const storedKeywords = sessionStorage.getItem('recentlyKeyword');
    return storedKeywords ? JSON.parse(storedKeywords) : [];
  };

  const cacheSearch = async (searchTerm: string) => {
    const cacheKey = `inputCache_${searchTerm}`;
    const cacheData = getCacheWithExpiry(cacheKey);

    if (cacheData) {
      setData(cacheData as T);
      setIsLoading(false);
    } else {
      const responseData = await fetchAPI(searchTerm);
      const expiryTime = 1 * 60 * 1000; //* test 1분
      setCacheWithExpiry(cacheKey, responseData, expiryTime);
      setData(responseData);
    }
  };

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

  return {
    data,
    isLoading,
    error,
    isError: error !== undefined,
    search,
    clearData,
    removeCache,
    saveRecentKeyword,
    getRecentKeywords,
    setCacheWithExpiry,
    getCacheWithExpiry,
  };
};

export default useSearch;
