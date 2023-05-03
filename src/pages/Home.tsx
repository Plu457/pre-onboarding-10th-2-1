import styled from "styled-components";
import SearchInput from "components/SearchInput";
import SuggestionModal from "components/SuggestionModal";

const Home = () => {
  return (
    <S.FakeMain>
      <S.SearchContainer>
        <S.Header>
          <S.Title>질환명을 검색해주세요.</S.Title>
          <SearchInput />
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
