import axios from "axios";

export function fetchUser(id) {
  return function(dispatch) {
    axios.get(`/users/${id}`)
      .then((response) => {
        dispatch({type: "FETCH_USER", payload: response.data})
      })
  }
}
export function updateUser(id,params) {
  return function(dispatch) {
    axios.patch(`/users/${id}`, params)
    .then((response) => {
      console.log('user-res',response.data)
      dispatch({type: "UPDATE_USER", payload: response.data})
     }).catch(function (response) {
        console.log('error',response);
     });
  }
}
export function updateNews(params) {
  return function(dispatch) {
    axios.post('/news', params)
      .then(function (response) {
        console.log('response-news',response.data);
        dispatch({type: "UPDATE_NEWS", payload: response.data})
      })
      .catch(function (response) {
        console.log('error',response);
      });
  }
}
export function updateNewsText(value) {
  return {
    type: 'UPDATE_NEWS_TEXT',
    payload: value,
  }
}

export function updateFiles(value) {
  return {
    type: 'UPDATE_FILES',
    payload: value,
  }
}
