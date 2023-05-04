import { SearchOutlined } from 'assets/icons';
import { ISearchResult } from 'pages/Home';
import styled from 'styled-components';

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <S.RecentSearchHeader>
    <h2>{title}</h2>
  </S.RecentSearchHeader>
);

const KeywordList: React.FC<{ recentKeywords: string[]; selectedIndex: number | null }> = ({
  recentKeywords,
  selectedIndex,
}) => (
  <S.RecentSearchList>
    {recentKeywords?.map((keyword, index) => (
      <S.RecentSearchItem
        key={`recent-search-${index}`}
        tabIndex={0}
        isSelected={selectedIndex === index}
      >
        <S.RecentSearchIconBtn type="button">
          <SearchOutlined color="#d6cdcd" />
        </S.RecentSearchIconBtn>
        <S.RecentSearchTextBtn type="button">{keyword}</S.RecentSearchTextBtn>
      </S.RecentSearchItem>
    ))}
  </S.RecentSearchList>
);

interface ISearchResultListProps {
  data: ISearchResult[];
  selectedIndex: number | null;
}

const SearchResultList: React.FC<ISearchResultListProps> = ({ data, selectedIndex }) => (
  <S.RecentSearchList>
    {data?.map((item, index) => (
      <S.RecentSearchItem key={item.id} tabIndex={0} isSelected={selectedIndex === index}>
        <S.RecentSearchIconBtn type="button">
          <SearchOutlined color="#d6cdcd" />
        </S.RecentSearchIconBtn>
        <S.RecentSearchTextBtn type="button">{item.name}</S.RecentSearchTextBtn>
      </S.RecentSearchItem>
    ))}
  </S.RecentSearchList>
);

interface ISuggestionModalProps {
  data: ISearchResult[];
  isRecentSearch: boolean;
  recentKeywords: string[];
  selectedIndex: number | null;
  isLoading: boolean;
}

const SuggestionModal: React.FC<ISuggestionModalProps> = ({
  data,
  isRecentSearch,
  recentKeywords,
  selectedIndex,
  isLoading,
}) => {
  return (
    <S.RecentSearchSection>
      {isRecentSearch ? (
        <>
          {recentKeywords.length > 0 ? (
            <>
              <SectionHeader title="최근 검색어" />
              <KeywordList recentKeywords={recentKeywords} selectedIndex={selectedIndex} />
            </>
          ) : (
            <S.NoRecentSearchText>최근 검색어가 없습니다.</S.NoRecentSearchText>
          )}
        </>
      ) : (
        <>
          {data && data.length > 0 ? (
            <>
              <SectionHeader title="검색 결과" />
              <SearchResultList data={data} selectedIndex={selectedIndex} />
            </>
          ) : (
            <S.NoRecentSearchText>검색 결과가 없습니다.</S.NoRecentSearchText>
          )}
        </>
      )}
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

  RecentSearchItem: styled.li<{ isSelected?: boolean }>`
    display: flex;
    align-items: center;
    padding: 10px 0;
    cursor: pointer;
    background-color: ${({ isSelected }) => (isSelected ? '#f5f5f5' : 'transparent')};

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
