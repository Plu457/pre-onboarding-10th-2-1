import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { fetchSearchResults, useDebounce, useSearch } from 'api';
import { SearchInput, SuggestionModal } from 'components';

export interface SearchResult {
  name: string;
  id: number;
}

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [isRecentSearch, setIsRecentSearch] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const { data, search, clearData, saveRecentKeyword, getRecentKeywords } =
    useSearch(fetchSearchResults);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  useEffect(() => {
    if (debouncedSearchTerm) {
      search(debouncedSearchTerm, true);
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
    search(keyword, true);
    setSelectedIndex(null);
  };

  return (
    <S.FakeMain>
      <S.SearchContainer ref={wrapperRef}>
        <S.Header style={{ borderColor: showSuggestionModal ? '#4a94e4' : '#ffffff' }}>
          <S.Title>질환명을 검색해주세요.</S.Title>
          <SearchInput
            data={data}
            searchTerm={searchTerm}
            onInputChange={handleInputChange}
            handleSearch={handleSearch}
            onSearch={() => handleSearch(searchTerm)}
            onInputClick={() => setShowSuggestionModal(true)}
            showSuggestionModal={showSuggestionModal}
            onFocus={() => {
              setShowSuggestionModal(true);
              setIsRecentSearch(true);
            }}
            isRecentSearch={isRecentSearch}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            recentKeywords={getRecentKeywords()}
          />
        </S.Header>
        {showSuggestionModal ? (
          <SuggestionModal
            data={data}
            isRecentSearch={isRecentSearch}
            recentKeywords={getRecentKeywords()}
            selectedIndex={selectedIndex}
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
