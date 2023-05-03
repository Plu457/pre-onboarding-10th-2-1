import S from "./style";
import { SearchClose, SearchOutlined } from "assets/icons";

const Home = () => {
  return (
    <S.FakeMain>
      <S.SearchContainer>
        <S.Header>
          <S.Title>질환명을 검색해주세요.</S.Title>
          <S.InputWrapper>
            <S.InputDescWrapper>
              <S.InputDescIconWrapper>
                <SearchOutlined color="#a7afb7" />
              </S.InputDescIconWrapper>
              <span>질환명을 입력해주세요</span>
            </S.InputDescWrapper>
            <S.Input name="q" type="search" />
            <S.ClearButton>
              <SearchClose color="#ffffff" />
            </S.ClearButton>
          </S.InputWrapper>
          <S.SearchButton type="button">
            <SearchOutlined />
          </S.SearchButton>
        </S.Header>
        <S.RecentSearchSection>
          <S.RecentSearchHeader>
            <h2>최근 검색어</h2>
          </S.RecentSearchHeader>
          <S.RecentSearchList>
            <S.RecentSearchItem>
              <S.RecentSearchIconBtn type="button">
                <SearchOutlined color="#d6cdcd" />
              </S.RecentSearchIconBtn>
              <S.RecentSearchTextBtn type="button">
                갑상선
              </S.RecentSearchTextBtn>
            </S.RecentSearchItem>
          </S.RecentSearchList>
          <S.NoRecentSearchText>최근 검색어가 없습니다.</S.NoRecentSearchText>
        </S.RecentSearchSection>
      </S.SearchContainer>
    </S.FakeMain>
  );
};

export default Home;
