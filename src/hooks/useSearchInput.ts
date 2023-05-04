import { useSearchContext } from 'context/SearchContext';
import { ISearchResult } from 'pages/Home';

const useSearchInput = () => {
  const {
    data,
    searchTerm,
    selectedIndex,
    isRecentSearch,
    setSelectedIndex,
    setShowSuggestionModal,
    setIsRecentSearch,
    getRecentKeywords,
    saveRecentKeyword,
    search,
    setSearchTerm,
  } = useSearchContext();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsRecentSearch(value.length === 0);
  };

  const handleSearch = (keyword: string) => {
    saveRecentKeyword(keyword);
    search(keyword, true);
    setSelectedIndex(null);
  };

  const onSearch = () => handleSearch(searchTerm);
  const onInputClick = () => setShowSuggestionModal(true);
  const recentKeywords = getRecentKeywords();
  const onFocus = () => {
    setShowSuggestionModal(true);
    setIsRecentSearch(true);
  };

  const handleClearInput = () => {
    onInputChange({ target: { value: '' } } as any);
  };

  const handleEnterKey = (dataToUse: ISearchResult[] | string[]) => {
    if (selectedIndex === null || !dataToUse || !dataToUse[selectedIndex]) {
      handleSearch(searchTerm);
    } else {
      const keyword = isRecentSearch
        ? (dataToUse[selectedIndex] as string)
        : (dataToUse[selectedIndex] as ISearchResult).name;
      handleSearch(keyword);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const dataToUse = isRecentSearch ? recentKeywords : data;

    switch (e.key) {
      case 'Enter':
        handleEnterKey(dataToUse);
        break;
      case 'ArrowDown':
        setSelectedIndex((prevIndex) => {
          const newIndex =
            prevIndex === null || !dataToUse || prevIndex >= dataToUse.length - 1
              ? 0
              : prevIndex + 1;
          return newIndex;
        });
        break;
      case 'ArrowUp':
        setSelectedIndex((prevIndex) => {
          const newIndex =
            prevIndex === null || !dataToUse || prevIndex <= 0
              ? dataToUse.length - 1
              : prevIndex - 1;
          return newIndex;
        });
        break;
      default:
        break;
    }
  };

  return {
    onInputChange,
    onSearch,
    onInputClick,
    onFocus,
    handleClearInput,
    handleKeyDown,
    recentKeywords,
    isRecentSearch,
    data,
  };
};

export default useSearchInput;
