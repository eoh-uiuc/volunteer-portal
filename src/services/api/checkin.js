export const checkIn = (netid, time) => {
    return checkInOut('checkin', netid, time);
}
export const checkOut = (netid, time) => {
    return checkInOut('checkout', netid, time);
}

const checkInOut = (endpoint, netid, time) => {


  const data = new URLSearchParams();
  data.append('uid', netid);
  data.append('time', time);

  return fetch(`${process.env.REACT_APP_API}/${endpoint}/`, {
    method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: data
  }).then(response => response.json())
    .then(data => {
      if (data.status !== 200) {
        throw new Error(data.message);
      } else {
        console.log("Successful hitting of endpoint: " + `${endpoint}`);
        console.log(data.data);
      }
      return data.data;
    });
}
/*
body: JSON.stringify({
  firstParam: 'yourValue',
  secondParam: 'yourOtherValue',
})*/