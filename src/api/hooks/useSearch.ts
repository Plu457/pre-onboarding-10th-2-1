import { useState } from 'react';

interface UseSearchReturnType<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | undefined;
  isError: boolean;
  search: (searchTerm: string) => Promise<void>;
  clearData: () => void;
}

const useSearch = <T>(fetchAPI: (searchTerm: string) => Promise<T>): UseSearchReturnType<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const search = async (searchTerm: string) => {
    try {
      setIsLoading(true);
      const responseData = await fetchAPI(searchTerm);
      setData(responseData);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearData = () => setData(undefined);

  return { data, isLoading, error, isError: error !== undefined, search, clearData };
};

export default useSearch;
