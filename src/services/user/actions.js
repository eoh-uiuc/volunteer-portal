export const SET_JWT = 'SET_JWT';
export const CLEAR_JWT = 'CLEAR_JWT';

export function setJWT(jwt) {
  localStorage.setItem('jwt', jwt);

  return {
    type: SET_JWT,
    jwt,
  };
}

export function clearJWT() {
  localStorage.removeItem('jwt');

  return {
    type: CLEAR_JWT,
  };
}
