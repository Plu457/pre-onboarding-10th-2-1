import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { fetchSearchResults, useDebounce, useSearch } from 'api';
import { SearchInput, SuggestionModal } from 'components';

export interface SearchResult {
  name: string;
  id: number;
}

const saveRecentKeyword = (keyword: string) => {
  const recentKeywords = sessionStorage.getItem('recentlyKeyword');
  let recentKeywordsArray: string[] = recentKeywords ? JSON.parse(recentKeywords) : [];

  if (!recentKeywordsArray.includes(keyword)) {
    recentKeywordsArray.push(keyword);
    sessionStorage.setItem('recentlyKeyword', JSON.stringify(recentKeywordsArray));
  }
};

const getRecentKeywords = (): string[] => {
  const recentKeywords = sessionStorage.getItem('recentlyKeyword');
  return recentKeywords ? JSON.parse(recentKeywords) : [];
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [isRecentSearch, setIsRecentSearch] = useState(true);

  const { data, search, clearData } = useSearch(fetchSearchResults);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  useEffect(() => {
    if (debouncedSearchTerm) {
      search(debouncedSearchTerm);
    } else {
      clearData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestionModal(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsRecentSearch(value.length === 0);
  };

  const handleSearch = (keyword: string) => {
    saveRecentKeyword(keyword);
    search(keyword);
  };

  return (
    <S.FakeMain>
      <S.SearchContainer ref={wrapperRef}>
        <S.Header style={{ borderColor: showSuggestionModal ? '#4a94e4' : '#ffffff' }}>
          <S.Title>질환명을 검색해주세요.</S.Title>
          <SearchInput
            searchTerm={searchTerm}
            onInputChange={handleInputChange}
            onSearch={() => handleSearch(searchTerm)}
            onInputClick={() => setShowSuggestionModal(true)}
            showSuggestionModal={showSuggestionModal}
            onFocus={() => {
              setShowSuggestionModal(true);
              setIsRecentSearch(true);
            }}
            isRecentSearch={isRecentSearch}
          />
        </S.Header>
        {showSuggestionModal ? (
          <SuggestionModal
            data={data}
            isRecentSearch={isRecentSearch}
            recentKeywords={getRecentKeywords()}
          />
        ) : null}
      </S.SearchContainer>
    </S.FakeMain>
  );
};

export default Home;

const S = {
  FakeMain: styled.main`
    display: flex;
    justify-content: center;
    padding-top: 100px;
    width: 100vw;
    height: 100vh;
    background-color: #c1ebf6;
  `,

  SearchContainer: styled.div`
    max-width: 470px;
    width: 100%;
  `,

  Header: styled.header`
    display: flex;
    align-items: center;
    padding: 0 10px;
    background-color: #ffffff;
    border: 2px solid;
    border-radius: 42px;
    border-color: #ffffff;
  `,

  Title: styled.h1`
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
  `,
};
