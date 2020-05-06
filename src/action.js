export const ADD_USER = 'ADD_USER';
export const USER_FETCHED='USER_FETCHED';
export const SET_SCHOOLS='SET_SCHOOLS';

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

export function setSchool(schools) {
  console.log("dasda",schools)
  return {
    type: SET_SCHOOLS,
    schools,
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

// export function getSchoolDetails() {
//   return dispatch => {
//     fetch(`/api/school/`)
//       .then(res => res.json())
//       .then(data => dispatch(setSchool(data.user)));
//   }
// }
export function fetchSchool() {
  return dispatch => {
    fetch('/api/school')
      .then(res => res.json())
      .then(data => dispatch(setSchool(data.schools)));
  }
  
 }


export function loginUser(emailId){
return dispatch=>{
  return fetch('/api/auth', {
    method: 'post',
    body: JSON.stringify({emailId}),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(handleResponse)
  .then(data => dispatch({type:"", data:data}));
}
}