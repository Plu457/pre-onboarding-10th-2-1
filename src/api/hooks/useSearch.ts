import { useState } from 'react';
interface UseSearchReturnType<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | undefined;
  isError: boolean;
  search: (searchTerm: string) => Promise<void>;
  clearData: () => void;
  removeCache: (searchTerm: string) => void;
  saveRecentKeyword: (keyword: string) => void;
  getRecentKeywords: () => string[];
}

const useSearch = <T>(fetchAPI: (searchTerm: string) => Promise<T>): UseSearchReturnType<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

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
    const cacheData = sessionStorage.getItem(cacheKey);

    if (cacheData) {
      setData(JSON.parse(cacheData));
      setIsLoading(false);
    } else {
      const responseData = await fetchAPI(searchTerm);
      sessionStorage.setItem(cacheKey, JSON.stringify(responseData));
      setData(responseData);
    }
  };

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

  const removeCache = (searchTerm: string) => {
    sessionStorage.removeItem(`search_cache_${searchTerm}`);
  };

  const clearData = () => setData(undefined);

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
  };
};

export default useSearch;
