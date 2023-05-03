import { client } from './client';

const fetchSearchResults = async (searchTerm: string) => {
  try {
    const res = await client.get(`/api/v1/search-conditions/?name=${searchTerm}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};

export default fetchSearchResults;
