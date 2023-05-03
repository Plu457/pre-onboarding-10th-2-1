import { SearchOutlined } from 'assets/icons';
import { SearchResult } from 'pages/Home';
import styled from 'styled-components';

interface SuggestionModalProps {
  data: SearchResult[] | undefined;
  isRecentSearch: boolean;
}

const SuggestionModal: React.FC<SuggestionModalProps> = ({ data, isRecentSearch }) => {
  return (
    <S.RecentSearchSection>
      <S.RecentSearchHeader>
        <h2>{isRecentSearch ? '최근 검색어' : '추천 검색어'}</h2>
      </S.RecentSearchHeader>
      <S.RecentSearchList>
        {data?.map((item) => (
          <S.RecentSearchItem key={item.id}>
            <S.RecentSearchIconBtn type="button">
              <SearchOutlined color="#d6cdcd" />
            </S.RecentSearchIconBtn>
            <S.RecentSearchTextBtn type="button">{item.name}</S.RecentSearchTextBtn>
          </S.RecentSearchItem>
        ))}
      </S.RecentSearchList>
      <S.NoRecentSearchText>최근 검색어가 없습니다.</S.NoRecentSearchText>
    </S.RecentSearchSection>
  );
};

export default SuggestionModal;

const S = {
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
