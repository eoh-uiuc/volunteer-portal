import store from '../store';

const processTimeslots = (data) => {
  const days = {};
  Object.keys(data).forEach(station => {
    data[station].forEach((cell) => {
      const s = cell.start.split(' ');
      const day = s[0];
      const time = s[1];
      if (!days[day]) { days[day] = {}; }
      if (!days[day][station]) { days[day][station] = []; }
      days[day][station].push(Object.assign({}, { day, time }, cell));
    });
  });
  return days;
}

export const getAllTimeslots = () => {
  return fetch(`${process.env.REACT_APP_API}/get_all_timeslots/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: store.getState().user.jwt,
    },
  }).then(response => response.json())
    .then(data => {
      if (data.status !== 200) {
        throw new Error(data.message);
      }
      return processTimeslots(data.data);
    });
}

export const addTimeslot = (tsid) => {
  return mutateTimeslot('add_timeslot', tsid);
}

export const removeTimeslot = (tsid) => {
  return mutateTimeslot('del_timeslot', tsid);
}

const mutateTimeslot = (endpoint, tsid) => {
  const data = new URLSearchParams();
  data.append('auth_token', store.getState().user.jwt);
  data.append('tsid', tsid);

  return fetch(`${process.env.REACT_APP_API}/${endpoint}/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: store.getState().user.jwt,
    },
    body: data,
  }).then(response => response.json())
    .then(data => {
      if (data.status !== 200) {
        throw new Error(data.message);
      }
      return data.data;
    });
}

const extractIDs = (data) => {
  const res = [];
  Object.keys(data).forEach(k => {
    data[k].forEach(d => res.push(d.tsid));
  });
  return res;
}

export const getRegisteredTimeslots = () => {
  return fetch(`${process.env.REACT_APP_API}/get_timeslots/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: store.getState().user.jwt,
    },
  }).then(response => response.json())
    .then(data => {
      if (data.status !== 200) {
        throw new Error(data.message);
      }
      return extractIDs(data.data);
    });
}
