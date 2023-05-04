import { SearchClose, SearchOutlined } from 'assets/icons';
import { useSearchContext } from 'context/SearchContext';
import { ISearchResult } from 'pages/Home';
import React from 'react';
import styled from 'styled-components';

const SearchInput: React.FC = () => {
  const {
    data,
    searchTerm,
    selectedIndex,
    isRecentSearch,
    setSelectedIndex,
    setShowSuggestionModal,
    showSuggestionModal,
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

  return (
    <>
      <S.InputWrapper>
        <S.InputDescWrapper style={{ display: showSuggestionModal ? 'none' : 'flex' }}>
          <S.InputDescIconWrapper>
            <SearchOutlined color="#a7afb7" />
          </S.InputDescIconWrapper>
          <span>질환명을 입력해주세요</span>
        </S.InputDescWrapper>
        <S.Input
          name="q"
          type="search"
          autoComplete="off"
          value={searchTerm}
          onChange={onInputChange}
          onClick={onInputClick}
          onFocus={onFocus}
          onKeyDown={handleKeyDown}
        />
        {searchTerm ? (
          <S.ClearButton onClick={handleClearInput}>
            <SearchClose color="#ffffff" />
          </S.ClearButton>
        ) : null}
      </S.InputWrapper>
      <S.SearchButton type="button" onClick={onSearch}>
        <SearchOutlined />
      </S.SearchButton>
    </>
  );
};

export default SearchInput;

const S = {
  InputWrapper: styled.div`
    position: relative;
    display: flex;
    width: 100%;
    padding: 20px 10px 20px 14px;
    font-size: 18px;
  `,

  InputDescWrapper: styled.div`
    position: absolute;
    top: 35%;
    display: flex;
    color: #a7afb7;
    pointer-events: none;
  `,

  InputDescIconWrapper: styled.div`
    margin-right: 12px;
  `,

  Input: styled.input`
    width: 100%;
  `,

  ClearButton: styled.button`
    height: 36px;
    background-color: #a7afb7;
    border-radius: 100%;
    cursor: pointer;
  `,

  SearchButton: styled.button`
    width: 48px;
    height: 48px;
    background-color: #007be9;
    border-radius: 100%;
    cursor: pointer;
  `,
};
