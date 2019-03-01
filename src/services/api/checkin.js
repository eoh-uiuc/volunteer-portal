export const checkIn = (netid, time) => {
    return checkInOut('check_in', netid, time);
}
export const checkOut = (netid, time) => {
    return checkInOut('check_out', netid, time);
}

const checkInOut = (endpoint, netid, time) => {
  const data = new URLSearchParams();
  data.append('uid', netid);
  data.append('time', time);

  return fetch(`https://api.eohillinois.org/${endpoint}/`, {
    method: 'POST',
      headers: {
        Accept: 'application/json'
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