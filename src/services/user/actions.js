export const SET_JWT = 'SET_JWT';

export function setJWT(jwt) {
  return {
    type: SET_JWT,
    jwt,
  };
}
