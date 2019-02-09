const endpoint = `${process.env.REACT_APP_API}/login/`;
//Should be process.env.REACT_APP_API
export const login = (body) => {
  const data = new URLSearchParams();
  Object.keys(body).forEach(k => {
    data.append(k, body[k]);
  });

  return fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: data,
  }).then(response => response.json());
}
