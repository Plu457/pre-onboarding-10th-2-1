import styled from "styled-components";

const S = {
  //* 입력창
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

  //* 최근 검색어 및 제안 단어를 보여주는 모달

  RecentSearchSection: styled.section`
    margin-top: 12px;
    padding: 24px;
    background-color: #ffffff;
    border-radius: 20px;
  `,

  RecentSearchHeader: styled.header`
    margin-bottom: 12px;
    font-size: 8px;
    color: #a7afb7;
  `,

  RecentSearchList: styled.ol`
    padding: 0;
    max-height: 280px;
    overflow: hidden;
  `,

  RecentSearchItem: styled.li`
    display: flex;
    align-items: center;
    padding: 10px 0;
    cursor: pointer;

    :hover {
      background-color: #f5f5f5;
    }
  `,

  RecentSearchIconBtn: styled.button`
    cursor: pointer;
  `,

  RecentSearchTextBtn: styled.button`
    cursor: pointer;
  `,

  NoRecentSearchText: styled.p`
    font-size: 0.9rem;
    color: #888;
    margin-top: 1rem;
  `,
};

export default S;
