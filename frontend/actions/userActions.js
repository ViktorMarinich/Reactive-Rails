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
export function updateGallery(value) {
  return {
    type: 'UPDATE_GALLERY',
    payload: value,
  }
}
export function updateNewsFiles(value) {
  return {
    type: 'UPDATE_NEWS_FILES',
    payload: value,
  }
}
export function updateIncoming(id) {
  return function(dispatch) {
    axios.get(`/users/${id}`)
      .then((response) => {
        dispatch({type: "UPDATE_INCOMING_REQUESTS", payload: response.data})
      })
  }
}
export function updateOutcoming(id) {
  return function(dispatch) {
    axios.get(`/users/${id}`)
      .then((response) => {
        dispatch({type: "UPDATE_OUTCOMING_REQUESTS", payload: response.data})
      })
  }
}
export function deleteFriend(params) {
  return function(dispatch) {
    axios.post('/friends/destroy', params)
    .then((response) => {
      dispatch({type: "DELETE_FRIEND", payload: response.data.user_id})
    })
  }
}
export function addFriend(params) {
  return function(dispatch) {
    axios.post('/friends', params)
    .then((response) => {
      console.log(response.data)
      dispatch({type: "ADD_FRIEND", payload: response.data})
    })
  }
}
