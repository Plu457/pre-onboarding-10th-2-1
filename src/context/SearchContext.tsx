import React, { createContext, useContext, useState } from 'react';

interface ISearchContext {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  showSuggestionModal: boolean;
  setShowSuggestionModal: React.Dispatch<React.SetStateAction<boolean>>;
  isRecentSearch: boolean;
  setIsRecentSearch: React.Dispatch<React.SetStateAction<boolean>>;
  selectedIndex: number | null;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const SearchContext = createContext<ISearchContext | undefined>(undefined);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};

interface ISearchProviderProps {
  children: React.ReactNode;
}

export const SearchProvider: React.FC<ISearchProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [isRecentSearch, setIsRecentSearch] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        showSuggestionModal,
        setShowSuggestionModal,
        isRecentSearch,
        setIsRecentSearch,
        selectedIndex,
        setSelectedIndex,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
