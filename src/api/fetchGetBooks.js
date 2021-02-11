import { API_URL } from '../utils/constants';

export async function fetchGetCategoryBooks(query) {
  const url = `${API_URL}?q=subject:${query}`;
  const error = new Error();
  return await fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        error.message = `Error searching for books with category: ${query}`;
        throw error;
      }
    })
    .then((response) => {
      return response.items || [];
    });
}

export async function fetchGetSearchBooks(query) {
  const url = `${API_URL}?q=${query}&maxResults=40`;
  const error = new Error();
  return await fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        error.message = `Error searching for books with term: ${query}`;
        throw error;
      }
    })
    .then((response) => {
      return response.items || [];
    });
}
