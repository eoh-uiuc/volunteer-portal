const endpoint = `https://api.eohillinois.org/register/`;

export const register = (body) => {
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
