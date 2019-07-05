export async function fetchAllResultsAsync(query, max) {
  return await fetch(
    `${process.env.REACT_APP_FETCH_ALL_API_ENDPOINT}query=${query}&max=${max}`
  ).then(response => {
    return response.json();
  });
}

export async function fetchOneResultAsync(id) {
  return await fetch(
    `${process.env.REACT_APP_FETCH_SINGLE_API_ENDPOINT}id=${id}`
  ).then(response => {
    return response.json();
  });
}
