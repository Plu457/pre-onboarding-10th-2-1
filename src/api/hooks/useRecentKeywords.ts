const useRecentKeywords = () => {
  const saveRecentKeyword = (keyword: string) => {
    const recentKeywords = getRecentKeywords();
    if (!recentKeywords.includes(keyword)) {
      sessionStorage.setItem('recentlyKeyword', JSON.stringify([keyword, ...recentKeywords]));
    }
  };

  const getRecentKeywords = (): string[] => {
    const storedKeywords = sessionStorage.getItem('recentlyKeyword');
    return storedKeywords ? JSON.parse(storedKeywords) : [];
  };
  return { saveRecentKeyword, getRecentKeywords };
};

export default useRecentKeywords;
