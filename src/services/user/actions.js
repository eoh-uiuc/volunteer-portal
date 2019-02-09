export const SET_JWT = 'SET_JWT';
export const SET_UID = 'SET_UID';

export function setJWT(jwt) {
  return {
    type: SET_JWT,
    jwt,
  };
}

export function setUID(uid) {
  return {
    type: SET_UID,
    uid,
  };
}