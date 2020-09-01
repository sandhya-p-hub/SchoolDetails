export const ADD_USER = 'ADD_USER';
export const USER_FETCHED='USER_FETCHED';
export const SET_SCHOOLS='SET_SCHOOLS';
export const GET_SCHOOLAREA= 'GET_SCHOOLAREA';
export const GET_INSTITUTEAREA = 'GET_INSTITUTEAREA';
export const GET_INSTITUTE = 'GET_INSTITUTE';
export const SAVE_SCHOOL = 'SAVE_SCHOOL';
export const UPDATE_SCHOOL = 'UPDATE_SCHOOL';
export const SCHOOL_DELETED = 'SCHOOL_DELETED';
export const CHART_DATA = 'CHART_DATA';
export const SAVE_SCHOOLAREA='SAVE_SCHOOLAREA';

function handleResponse(response) {
  if (response.ok) {
    return response.json();

  } else {
    console.log(response)
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function setLineGraph(data) {
  const chartData = [];
  console.log("action_____> " , data)
	data.schools.filter(el => {
		chartData.push({ NoInStock:el.NoInStock, count: el.count })
	});
	return {
		type: CHART_DATA,
		chartData
	}
};


export function addUser(user) {
  return {
    type: ADD_USER,
    user
  }
}


export function addSchool(schools) {
  return {
    type: SAVE_SCHOOL,
    schools
  }
}
export function addSchoolArea(schoolArea) {
  return {
    type: SAVE_SCHOOLAREA,
    schoolArea
  }
}
export function setSchool(schools) {
  return {
    type: SET_SCHOOLS,
    schools,
  }
 }

 export function editSchool(schools,id) {
  return {
    type:UPDATE_SCHOOL,
    schools,
    id
  }
}

 export function getInstitute(Institute) {
   console.log("institute",Institute)
  return {
    type: GET_INSTITUTE,
    Institute,
  }
 }
 
 export function getSchoolArea(schoolArea) {
  console.log("getSchoolArea",schoolArea)
  return {
    type: GET_SCHOOLAREA,
    schoolArea,
  }
 }
 
 export function getInstituteArea(InstituteArea) {
  console.log("getSchoolArea",InstituteArea)
  return {
    type: GET_INSTITUTEAREA,
    InstituteArea,
  }
 }
 
 export function schoolDeleted(id){
  return {
    type: SCHOOL_DELETED,
    id
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

export function saveSchool(data) {
  return dispatch => {
    return fetch('/api/saveschool', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(addSchool(data.schools)));
  }
}


export function updateSchool(data,id) {
  console.log("action id",data)
  return dispatch => {
    return fetch(`/api/updateschool/${id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(editSchool(data.schools,id)));
  }
}


export function updateSchoolArea(data) {
  console.log("updateSchoolarea", data)
  return dispatch => {
    return fetch('/api/updateschoolArea', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => 
      console.log("data",data.name),
      dispatch(addSchoolArea(data.name)));
  }
}

export function deleteSchool(id){
  return dispatch => {
    return fetch(`/api/schools/${id}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(handleResponse)
    .then(data => dispatch(schoolDeleted(id)));
  }
}

export function fetchUser(emailId) {
  return dispatch => {
    fetch(`/api/user/${emailId}`)
      .then(res => res.json())
      .then(data => dispatch(userFetched(data.user)));
  }
}


export function fetchSchool() {
  return dispatch => {
    fetch('/api/school')
      .then(res => res.json())
      .then(data => {
        dispatch(setSchool(data.schools));
        dispatch(setLineGraph(data));
      }
      );
  }
}
  export function fetchInstitute() {
    return dispatch => {
      fetch('/api/Institute')
        .then(res => res.json())
        .then(data => dispatch(getInstitute(data.Institute)));
    }
 }
 export function fetchSchoolArea() {
  return dispatch => {
    fetch('/api/schoolArea')
      .then(res => res.json())
      .then(data => dispatch(getSchoolArea(data.schoolArea)));
  }
  
 }

 export function fetchInstituteArea() {
  return dispatch => {
    fetch('/api/InstituteArea')
      .then(res => res.json())
      .then(data => dispatch(getInstituteArea(data.InstituteArea)));
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