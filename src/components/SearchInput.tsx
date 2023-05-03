import React from 'react';
import { SearchClose, SearchOutlined } from 'assets/icons';
import styled from 'styled-components';

interface SearchInputProps {
  searchTerm: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  onInputClick: () => void;
  showSuggestionModal: boolean;
  onFocus: () => void;
  isRecentSearch: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onInputChange,
  onSearch,
  onInputClick,
  showSuggestionModal,
  onFocus,
  isRecentSearch,
}) => {
  const handleClearInput = () => {
    onInputChange({ target: { value: '' } } as any);
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
          value={searchTerm}
          onChange={onInputChange}
          onClick={onInputClick}
          onFocus={onFocus}
        />
        {searchTerm && (
          <S.ClearButton onClick={handleClearInput}>
            <SearchClose color="#ffffff" />
          </S.ClearButton>
        )}
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
