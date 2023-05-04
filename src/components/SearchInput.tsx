import React from 'react';
import styled from 'styled-components';

import { useSearchContext } from 'context/SearchContext';
import { SearchClose, SearchOutlined } from 'assets/icons';
import { useSearchInput } from 'hooks';

const SearchInput: React.FC = () => {
  const { searchTerm, showSuggestionModal } = useSearchContext();
  const { onInputChange, onInputClick, onFocus, handleKeyDown, handleClearInput, onSearch } =
    useSearchInput();

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
