import { useState } from 'react';
import useCache from './useCache';
import useRecentKeywords from './useRecentKeywords';

export interface IUseSearchReturnType<T> {
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
  getCacheWithExpiry: (key: string) => Promise<T | null>;
}

const useSearch = <T>(fetchAPI: (searchTerm: string) => Promise<T>): IUseSearchReturnType<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const { setCacheWithExpiry, getCacheWithExpiry, removeCache } = useCache<T>();
  const { saveRecentKeyword, getRecentKeywords } = useRecentKeywords();

  const search = async (searchTerm: string) => {
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

  const cacheSearch = async (searchTerm: string) => {
    const cacheKey = `inputCache_${searchTerm}`;
    const cacheData = await getCacheWithExpiry(cacheKey);

    if (cacheData) {
      setData(cacheData as T);
      setIsLoading(false);
    } else {
      console.info('calling api');
      const responseData = await fetchAPI(searchTerm);
      const expiryTime = 1 * 60 * 1000; // * test 1분
      setCacheWithExpiry(cacheKey, responseData, expiryTime);
      setData(responseData);
    }
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
