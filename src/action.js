export const ADD_USER = 'ADD_USER';
export const USER_FETCHED='USER_FETCHED';

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}


export function addUser(user) {
  return {
    type: ADD_USER,
    user
  }
}

export function userFetched(user) {
  return {
    type: USER_FETCHED,
    user
  }
}



export function saveUser(data) {
  return dispatch => {
    return fetch('/api/user', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(addUser(data.user)));
  }
}


export function fetchUser(emailId) {
  return dispatch => {
    fetch(`/api/user/${emailId}`)
      .then(res => res.json())
      .then(data => dispatch(userFetched(data.user)));
  }
}
