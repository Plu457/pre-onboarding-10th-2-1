import { useState } from 'react';
import styled from 'styled-components';
import { fetchSearchResults, useSearch } from 'api';
import { SearchInput, SuggestionModal } from 'components';

interface SearchResult {
  name: string;
  id: number;
}

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error, search } = useSearch<SearchResult[]>(fetchSearchResults);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search(searchTerm);
  };

  return (
    <S.FakeMain>
      <S.SearchContainer>
        <S.Header>
          <S.Title>질환명을 검색해주세요.</S.Title>
          <SearchInput
            searchTerm={searchTerm}
            onInputChange={handleInputChange}
            onSearch={handleSearch}
          />
        </S.Header>
        <SuggestionModal />
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
