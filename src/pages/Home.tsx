import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { useDebounce } from 'api';
import { SearchInput, SuggestionModal } from 'components';
import { useSearchContext } from 'context/SearchContext';
import { useClickOutside } from 'hooks';

export interface ISearchResult {
  name: string;
  id: number;
}

const Home = () => {
  const {
    searchTerm,
    setSearchTerm,
    showSuggestionModal,
    setShowSuggestionModal,
    search,
    clearData,
  } = useSearchContext();

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
  useClickOutside(wrapperRef, () => {
    setShowSuggestionModal(false);
    setSearchTerm('');
  });

  return (
    <S.FakeMain>
      <S.SearchContainer ref={wrapperRef}>
        <S.Header style={{ borderColor: showSuggestionModal ? '#4a94e4' : '#ffffff' }}>
          <S.Title>질환명을 검색해주세요.</S.Title>
          <SearchInput />
        </S.Header>
        {showSuggestionModal ? <SuggestionModal /> : null}
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
